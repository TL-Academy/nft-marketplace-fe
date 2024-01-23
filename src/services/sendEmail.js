const sendEmail = async (subject, message, ipfsHash) => {
    try {
        const response = await fetch('http://localhost:8000/send-email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subject,
                message,
                ipfsHash,
            }),
        });

        if (response.ok) {
            console.log('Email sent successfully!');
        } else {
            console.error('Error sending email:', response.status);
        }
    } catch (error) {
        console.error('Error:', error);
    }
};
export default sendEmail;
