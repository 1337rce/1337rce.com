---
sidebar_position: 60
---
# Steganography

Steganography: The Art of Hidden Message    

Steganography is an **art or technique used for hiding secret or precious information inside something that looks common and ordinary**. The goal is to conceal data so that its presence is not evident upon human inspection. The term comes from the Greek words "steganos," meaning "hidden or concealed," and "graphia" or "graph," meaning "writing". It can be understood as the practice of "**hiding in plain sight**". Unlike cryptography, which makes a message unintelligible but its presence obvious, **steganography aims to conceal the very fact that communication is taking place**. While steganography is a form of obfuscation, obfuscation is a broader term for any technique that makes data difficult for third parties to understand. Steganography can be used alongside encryption for added security.

Historically, steganography dates back centuries. In ancient Greece, for example, messages were written on wood tablets and covered with wax to hide the information, as recorded by Herodotus. Romans also used invisible inks that could be revealed by heat or light. Basic physical forms of steganography in use for centuries include invisible ink and messages written under postage stamps. In modern times, steganography is used by various entities, including intelligence agencies, the military, and ethical hackers for confidential communication. Malicious hackers also use it to hide malicious code.

The basic process of steganography involves several steps:
1.  **Selecting a cover medium:** This is the file or message that will carry the hidden data. Common cover media include images (like JPEG, PNG, BMP), audio files (like MP3, WAV), video files (like MP4, AVI), and text files or documents.
2.  **Optional Encryption:** Sometimes, the secret message is encrypted before embedding to add an additional layer of security. This ensures that even if the hidden data is detected, it cannot be read without the decryption key.
3.  **Embedding the Secret Message:** The secret message is then hidden within the cover medium using various techniques.
4.  **Creating the Stego-object:** The resulting file, which contains both the cover data and the hidden message, is called the stego-object. This object can then be transmitted or stored without raising suspicion.
5.  **Extraction:** The receiver needs to know the method used for embedding the secret message. A secret key may also be required to extract the data if encryption was used.

Several techniques are used to embed data:
*   **Least Significant Bit (LSB):** This is a common technique. It involves modifying the least significant bit of a byte, often in image or audio files, to hide the secret message. Changing the LSB doesn't change the value significantly, and a 1-bit difference in color in an image is usually imperceptible to the human eye. By modifying the lowest bit across pixels in an image or bytes in an audio file, a message can be constructed. Decoding involves grabbing the LSB from each byte and converting the collection of bits back into the original message or file.
*   **Frequency Domain:** Instead of modifying raw data like pixels or audio samples, the secret message can be embedded in the frequency components of a file.
*   **Bit Planes:** In this method, data is hidden in the higher-order bit planes of an image, which can be considered more secure.
*   **Secure Cover Selection:** This technique involves finding an image block that matches malware blocks and fitting it into a carrier image to create an infected, identical image that passes through threat detection.
*   **Palette-Based Technique:** This technique embeds messages in palette-based images, such as GIF files, making detection difficult.

The sources mention five main types of digital steganography:
1.  **Text Steganography:** Hides secret information within a piece of text. Techniques can include using the first letter of words, adding meaningful typos, or encoding information through punctuation. An example is using the first letters of "Indians love Unity" to spell "ILU". An acrostic, using the first letter of each sentence to form a hidden message, is also a form of text steganography.
2.  **Image Steganography:** Conceals information within a digital image. It leverages the fact that small changes in color or noise are hard to detect. Image steganography terms include the cover-image, message, stego-image, and stego-key. LSB is often used here, embedding data in the least significant bits of pixel values.
3.  **Audio Steganography:** Hides information within an audio file. This can involve altering properties like frequency or amplitude, or using techniques like LSB. Backmasking (playing messages backward) is a simple form. Special listening devices or decryption keys might be needed to decipher hidden audio information. It is generally used for digital rights management in audio files.
4.  **Video Steganography:** Embeds secret information within a video file. Since video is a sequence of consecutive images, it is considered an advanced version of image steganography. Discrete cosine transform (DCT) is commonly used to insert values to hide data in each image. Common file formats include H.264, MP4, MPEG, and AVI.
5.  **Network Steganography (or Protocol Steganography):** Conceals information within network traffic by using network protocols like TCP, UDP, ICMP, or IP as a cover object. Information can be hidden in TCP/IP headers or payloads, or even based on the time between packets. It tries to hide secret information in the usual flow of internet or network activity. Considered more advanced and practically useful for some hackers.

Steganography has both constructive and destructive purposes. Legitimate uses include secure communication by intelligence agencies, the military, and ethical hackers. Dissidents under oppressive regimes can use it to hide messages. However, malicious hackers use it to hide malicious code, malware source code, or scripts within seemingly harmless files like images, audio, or documents. Examples include the Red Eyes Hacking Group using a JPG with embedded shellcode in a phishing email, Worok hiding malicious payloads in PNG files, Waterbug delivering a backdoor in WAV files, a campaign delivering an XMRIG Monero CPU miner in WAV files, and the PLATINUM group embedding malware commands in HTML using TAB and SPACE sequences. In 2020, a web skimmer was hidden in the EXIF metadata of an image file to capture user details. A campaign in the UK, Germany, Italy, and Japan in 2020 used a steganographic image on Imgur to hide a script that downloaded Mimikatz malware. Steganography is also a favored method for ransomware delivery. Hackers are also increasingly using Artificial Intelligence (AI) alongside steganography to make attacks harder to detect.

Steganography offers advantages such as making communications less attention-grabbing than encryption, providing a double layer of protection (the file itself and the decoded data), and enabling intimate communication for agencies.

Detecting steganography can be challenging as attackers continuously adjust their methods. While some security tools and antivirus software can spot common behaviors of steganographic programs, attackers adapt to create new signatures. Mitigation strategies include using modern endpoint protection solutions that go beyond static checks, installing the newest security patches, using web filtering, and making employees aware of risks, such as opening image files.

Several tools are available to perform steganography, including 
- OpenStego (for images), 
- OpenPuff (for images, audio, video, Flash), 
- Steghide (for images, audio, text), 
- Stegosuite (Java-based for images), 
- Xiao Steganography (for BMP images, WAV files), 
- SSuite Picsel (for hiding text in images), 
- Image Steganography (JavaScript tool for images), 
- Crypture (command-line tool), NoClue (open-source for text in video/image), 
- Steganography Master (Android app for text in images).   

Tools also exist for attempting to detect or analyze potential steganography, such as 
- `file` command, 
- EXIFtool, 
- Foremost, 
- Binwalk, 
- Strings, 
- Hex Editor, 
- Stegsolve, 
- Steghide, 
- pngcheck, 
- Zsteg, 
- Tesseract, 
- Npiet, 
- GraphicMagick, 
- StegoVeritas, 
- Imageerrorlevelanalysis, 
- Magic Eye Solver/Viewer, 
- FFT, 
- Sonic Visualizer, 
- Wavsteg, 
- Deepsound, 
- Ffmpeg, 
- Fcrackzip, 
- Zipdetails, 
- Zipinfo, 
- CyberChef, 
- Dcode, 
- Spammimic, 
- Unicode Text Steganography Encoders/Decoders.

---