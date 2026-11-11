# Co-op Portfolio — HTML/CSS/JavaScript

เว็บพอร์ตโฟลิโอหน้าเดียวสำหรับนักศึกษาที่กำลังสมัครสหกิจ พร้อมหน้า Resume ที่พิมพ์หรือบันทึกเป็น PDF ได้

## ไฟล์สำคัญ

- `index.html` — เนื้อหาหน้า Portfolio
- `styles.css` — สี เลย์เอาต์ และ responsive design
- `script.js` — mobile menu, dark mode, command palette, animation และ project preview
- `resume.html` / `resume.css` — Resume แบบ A4

## เริ่มใช้งาน

เปิด `index.html` ได้ทันที หรือรัน local server:

```powershell
python -m http.server 4173
```

แล้วเปิด `http://localhost:4173`

## เผยแพร่ด้วย GitHub Pages

โปรเจกต์มี workflow ที่ `.github/workflows/deploy-pages.yml` สำหรับเผยแพร่เว็บไซต์อัตโนมัติจาก branch `main`

1. สร้าง repository ใหม่บน GitHub (แนะนำชื่อ `web-portfolio`)
2. ผูก repository แล้ว push:

```powershell
git remote add origin https://github.com/<username>/web-portfolio.git
git push -u origin main
```

3. เปิด `Settings > Pages`
4. ที่ `Build and deployment > Source` เลือก `GitHub Actions`
5. เปิดแท็บ `Actions` เพื่อตรวจ workflow ชื่อ `Deploy portfolio to GitHub Pages`

เมื่อสำเร็จ เว็บไซต์จะอยู่ที่ `https://<username>.github.io/web-portfolio/`

> หมายเหตุ: GitHub Pages เป็นเว็บไซต์สาธารณะ ตรวจสอบรูป อีเมล และเบอร์โทรก่อน push ไป repository สาธารณะ

## จุดที่ควรแก้ก่อนใช้งานจริง

1. แทนที่กล่อง `YOUR PHOTO` ด้วย `<img>` รูปโปรไฟล์ของคุณ
2. เพิ่มรายละเอียดเทคโนโลยี บทบาท และลิงก์ Demo/GitHub ให้แต่ละโปรเจกต์เมื่อข้อมูลพร้อม
3. ตรวจชื่อโปรเจกต์และคำอธิบายผลงานให้ตรงกับสิ่งที่ทำจริง
4. เปิด `resume.html` เพื่อตรวจสอบและบันทึกเป็น PDF
5. ตรวจอีเมลและเบอร์โทรทุกจุดก่อนเผยแพร่สู่สาธารณะ

## แนวทางดีไซน์จาก 21st.dev

ดีไซน์นี้เขียนใหม่ด้วย HTML/CSS/JS ล้วนในแนว Professional Editorial โดยใช้ Navy เป็นสีหลัก และกระจาย Cobalt, Teal, Warm Sand เป็นสีเน้นในแต่ละส่วน นำแนวคิดมาปรับใช้จาก:

- Portfolio Hero — ชื่อขนาดใหญ่และภาพโปรไฟล์เด่น
- Project Showcase — รายการโปรเจกต์พร้อม floating preview ตามเมาส์
- Personal Site Kit — โครงสร้างหน้าเดียวและ command menu
- Bento Grid — สรุปข้อมูลสำคัญเป็นบล็อกที่สแกนเร็ว

ไม่ได้คัดลอก source code ของ component และไม่ต้องติดตั้ง React, Tailwind หรือ dependency ใด ๆ
