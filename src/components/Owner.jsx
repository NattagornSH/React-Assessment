function Owner() {
  const studentId = "JSD#12";
  const name = "Nattagorn Saehao";
  const nickname = "Jay";
  const batch = "Generation Thailand";

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="https://i.ibb.co/BKLkY9xM/Screenshot-2026-05-07-at-08-54-43.png"
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
            />
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 text-center">
              {studentId} {name} ({nickname}) - {batch}
            </h1>
          </div>

          {/* Biography Section */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Short Biography:
            </h2>
            <p className="text-slate-700 leading-relaxed">
              สวัสดีครับ ผม {nickname} เป็นนักเรียนใน {batch} รุ่น {studentId}{" "}
              กำลังเรียนรู้การพัฒนาเว็บแอปพลิเคชันด้วย React
              และเทคโนโลยีสมัยใหม่ มีความสนใจในการสร้าง UI/UX
              ที่สวยงามและใช้งานง่าย
              และอยากพัฒนาทักษะการเขียนโปรแกรมให้ดียิ่งขึ้น
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Owner;
