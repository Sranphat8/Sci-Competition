const ActivityCard = ({ activity }) => {
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    // เพิ่ม mb-6 (margin-bottom) เพื่อเว้นระยะห่างระหว่าง Card แต่ละใบ
    <div
      className="card bg-base-100 shadow-md border border-base-300 mb-6"
      key={activity.id}
    >
      <div className="card-body">
        <h2 className="card-title text-primary">{activity.name}</h2>
        <p>{activity.description}</p>

        <div className="mt-4 space-y-1 text-sm">
          <p>
            <strong>ประเภทกิจกรรม:</strong>{" "}
            {activity.type === "competition" ? "การแข่งขัน" : activity.type}
          </p>
          <p>
            <strong>ระดับ:</strong> {activity.level}
          </p>
          <p>
            <strong>จำนวนคนต่อทีม:</strong> {activity.team_size} คน
          </p>
          <p>
            <strong>วันที่แข่งขัน:</strong> {formatDate(activity.date)}
          </p>
          <p>
            <strong>สถานที่:</strong> {activity.location}
          </p>
          <p>
            <strong>รับสมัคร:</strong> {formatDate(activity.reg_open)} –{" "}
            {formatDate(activity.reg_close)}
          </p>
          <p>
            <strong>สถานะ:</strong>{" "}
            <span
              className={`font-bold ${
                activity.status === "open" ? "text-green-600" : "text-red-500"
              }`}
            >
              {activity.status === "open" ? "เปิดรับสมัคร" : "ปิดรับสมัคร"}
            </span>
          </p>
        </div>

        <div className="divider"></div>

        <div className="text-sm">
          <p>
            <strong>ติดต่อ:</strong> {activity.contact_name}
          </p>
          <p>📞 {activity.contact_phone}</p>
          <p>
            ✉️{" "}
            <a
              href={`mailto:${activity.contact_email}`}
              className="text-blue-600 underline"
            >
              {activity.contact_email}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;