// API สำหรับ Upload ข้อมูล (เวอร์ชันเพิ่มการจำกัดขนาดไฟล์)
router.post('/', verifyToken, requireRole('ฝ่ายบุคลากร'), async (req, res) => {
    try {
        const { name_doc } = req.body;
        const file = req.files?.file;

        // 1. ตรวจสอบว่ามีไฟล์ส่งมาหรือไม่
        if (!file) {
            return res.status(400).json({ message: 'กรุณาเลือกไฟล์' });
        }

        // 2. กำหนดขนาดไฟล์สูงสุด (ตัวอย่าง: 2MB)
        // สูตรคำนวณ: MB * 1024 * 1024
        const maxSize = 2 * 1024 * 1024; 

        if (file.size > maxSize) {
            return res.status(400).json({ message: 'ไฟล์มีขนาดใหญ่เกินไป (จำกัดไม่เกิน 2MB)' });
        }

        // --- โค้ดส่วนเดิมของคุณ ---
        const filename = Date.now() + path.extname(file.name).toLowerCase();
        await file.mv(path.join(updloadDir, filename));
        
        await db.query(`insert into tb_doc (name_doc, day_doc, file) value (?, CURDATE(), ?)`, [name_doc, filename]);
        
        res.status(201).json({ message: 'Upload Success' });
    } catch (err) {
        console.error('Error Upload', err);
        res.status(500).json({ message: 'Error Upload' });
    }
});