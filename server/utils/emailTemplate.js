export const getVerificationEmailTemplate = (verificationUrl, userName) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ยืนยันอีเมล</title>
    <style>
        body {
            font-family: 'Sarabun', Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .email-container {
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 30px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #f0f0f0;
            margin-bottom: 20px;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 15px;
        }
        h1 {
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 20px;
        }
        .content {
            margin-bottom: 30px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #3498db;
            color: #ffffff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
        }
        .button:hover {
            background-color: #2980b9;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 2px solid #f0f0f0;
            font-size: 12px;
            color: #666666;
        }
        .warning {
            background-color: #fff3cd;
            color: #856404;
            padding: 10px;
            border-radius: 4px;
            margin-top: 20px;
            font-size: 14px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <!-- You can add your logo here -->
            <h1>ระบบการแข่งขันทางวิทยาศาสตร์</h1>
        </div>
        
        <div class="content">
            <h2>ยินดีต้อนรับสู่ระบบการแข่งขันทางวิทยาศาสตร์!</h2>
            <p>เรียน คุณ${userName},</p>
            <p>ขอบคุณที่ลงทะเบียนเข้าร่วมระบบการแข่งขันทางวิทยาศาสตร์ เรายินดีเป็นอย่างยิ่งที่ได้ต้อนรับคุณเข้าสู่ระบบ</p>
            <p>กรุณายืนยันอีเมลของคุณเพื่อดำเนินการลงทะเบียนให้เสร็จสมบูรณ์และเข้าใช้งานระบบ</p>
            
            <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">ยืนยันอีเมล</a>
            </div>
            
            <div class="warning">
                <p>⚠️ ลิงก์ยืนยันอีเมลนี้จะหมดอายุภายใน 24 ชั่วโมง</p>
                <p>หากคุณไม่ได้เป็นผู้ลงทะเบียน กรุณาละเว้นการคลิกลิงก์นี้</p>
            </div>
        </div>
        
        <div class="footer">
            <p>นี่เป็นข้อความอัตโนมัติ กรุณาอย่าตอบกลับอีเมลนี้</p>
            <p>&copy; ${new Date().getFullYear()} ระบบการแข่งขันทางวิทยาศาสตร์ สงวนลิขสิทธิ์</p>
        </div>
    </div>
</body>
</html>
`;
