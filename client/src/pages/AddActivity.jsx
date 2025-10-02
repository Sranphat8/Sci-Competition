import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import ActivityService from "../services/activity.service";
const formatDateForInput = (dateValue) => {
    if (!dateValue) return "";
    const date = new Date(dateValue);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

// Helper function: ดึงค่าเริ่มต้นที่เป็น YYYY-MM-DD จาก Date.now()
const initialDateString = formatDateForInput(Date.now());


const AddActivity = () => {
    const navigate = useNavigate();

    // กำหนด Initial State โดยใช้ Timestamp (Date.now()) ตาม Logic เดิมของคุณ
    const [activity, setActivity] = useState({
        name: "",
        description: "",
        type: "",
        level: "",
        team_size: 1,
        date: initialDateString, // ใช้ String YYYY-MM-DD สำหรับฟอร์ม
        location: "",
        reg_open: initialDateString, // ใช้ String YYYY-MM-DD สำหรับฟอร์ม
        reg_close: initialDateString, // ใช้ String YYYY-MM-DD สำหรับฟอร์ม
        contact_name: "",
        contact_phone: "",
        contact_email: "",
        status: "draft",
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        
        // จัดการ input type="number" ให้เป็นตัวเลข
        let updatedValue = value;
        if (type === 'number') {
            updatedValue = Number(value);
        }
        // Note: สำหรับ input type="date" จะส่งค่าเป็น string YYYY-MM-DD มาให้แล้ว
        
        setActivity({ ...activity, [name]: updatedValue });
    };

    const resetForm = () => {
        setActivity({
            name: "",
            description: "",
            type: "",
            level: "",
            team_size: 1,
            date: initialDateString,
            location: "",
            reg_open: initialDateString,
            reg_close: initialDateString,
            contact_name: "",
            contact_phone: "",
            contact_email: "",
            status: "draft",
        });
    };
    
    const handleSubmit = async () => {
        // Validation เบื้องต้น
        if (!activity.name || !activity.location || !activity.date) {
            Swal.fire("Validation Error", "Please fill in Activity Name, Date, and Location.", "warning");
            return;
        }

        try {
            // Backend มักจะรับ String YYYY-MM-DD ได้เลย แต่หากต้องการ Timestamp 
            // คุณต้องแปลง date field กลับไปเป็น new Date(date).getTime() ก่อนส่ง API
            // แต่เพื่อคง Logic เดิมที่ส่งค่าตาม Input ไปตรงๆ (ซึ่งควรจะเป็น String Date)
            // เราจะส่ง Activity object ไปตรงๆ
            const newActivity = await ActivityService.createActivity(activity);
            
            if (newActivity.status === 201) {
                Swal.fire({
                    title: "Add new activity",
                    text: "Activity added successfully!",
                    icon: "success",
                }).then(() => {
                    resetForm();
                    navigate("/activities");
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Add new activity Error",
                text: error.response?.data?.message || error.message,
                icon: "error",
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-xl">
            <h1 className="text-4xl font-extrabold text-center mb-8 text-secondary">
                <span className="text-primary">Add New</span> Competition Activity
            </h1>
            
            <div className="space-y-6">
                
                {/* --- 1. Activity Details --- */}
                <h2 className="text-2xl font-semibold border-b pb-2 text-info">Activity Information</h2>

                {/* Name */}
                <label className="form-control w-full">
                    <div className="label"><span className="label-text font-medium">Activity Name <span className="text-red-500">*</span></span></div>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="ชื่อกิจกรรม"
                        name="name"
                        value={activity.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                
                {/* Description */}
                <label className="form-control w-full">
                    <div className="label"><span className="label-text font-medium">Description</span></div>
                    <textarea
                        className="textarea textarea-bordered h-24 w-full"
                        placeholder="รายละเอียดโดยย่อของกิจกรรม"
                        name="description"
                        value={activity.description}
                        onChange={handleChange}
                    />
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Type */}
                    <label className="form-control w-full">
                        <div className="label"><span className="label-text font-medium">Type</span></div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="e.g., competition"
                            name="type"
                            value={activity.type}
                            onChange={handleChange}
                        />
                    </label>
                    
                    {/* Level */}
                    <label className="form-control w-full">
                        <div className="label"><span className="label-text font-medium">Level</span></div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="e.g., High School"
                            name="level"
                            value={activity.level}
                            onChange={handleChange}
                        />
                    </label>

                    {/* Team Size */}
                    <label className="form-control w-full">
                        <div className="label"><span className="label-text font-medium">Team Size</span></div>
                        <input
                            type="number"
                            className="input input-bordered w-full"
                            placeholder="จำนวนคนต่อทีม"
                            name="team_size"
                            value={activity.team_size}
                            onChange={handleChange}
                            min="1"
                        />
                    </label>
                </div>
                
                {/* --- 2. Timing and Location --- */}
                <h2 className="text-2xl font-semibold border-b pb-2 pt-4 text-info">Timing & Location</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Date */}
                    <label className="form-control w-full">
                        <div className="label"><span className="label-text font-medium">Activity Date <span className="text-red-500">*</span></span></div>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            name="date"
                            value={activity.date}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    {/* Location */}
                    <label className="form-control w-full">
                        <div className="label"><span className="label-text font-medium">Location <span className="text-red-500">*</span></span></div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="สถานที่จัดกิจกรรม"
                            name="location"
                            value={activity.location}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Register Open Date */}
                    <label className="form-control w-full">
                        <div className="label"><span className="label-text font-medium">Registration Open Date</span></div>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            name="reg_open"
                            value={activity.reg_open}
                            onChange={handleChange}
                        />
                    </label>
                    
                    {/* Register Close Date */}
                    <label className="form-control w-full">
                        <div className="label"><span className="label-text font-medium">Registration Close Date</span></div>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            name="reg_close"
                            value={activity.reg_close}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                {/* --- 3. Contact Information --- */}
                <h2 className="text-2xl font-semibold border-b pb-2 pt-4 text-info">Contact Information</h2>

                {/* Contact Name */}
                <label className="form-control w-full">
                    <div className="label"><span className="label-text font-medium">Contact Name</span></div>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="ชื่อผู้ประสานงาน"
                        name="contact_name"
                        value={activity.contact_name}
                        onChange={handleChange}
                    />
                </label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Contact Phone */}
                    <label className="form-control w-full">
                        <div className="label"><span className="label-text font-medium">Phone Number</span></div>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            placeholder="เบอร์โทรศัพท์"
                            name="contact_phone"
                            value={activity.contact_phone}
                            onChange={handleChange}
                        />
                    </label>
                    
                    {/* Contact Email */}
                    <label className="form-control w-full">
                        <div className="label"><span className="label-text font-medium">Email</span></div>
                        <input
                            type="email"
                            className="input input-bordered w-full"
                            placeholder="อีเมลผู้ประสานงาน"
                            name="contact_email"
                            value={activity.contact_email}
                            onChange={handleChange}
                        />
                    </label>
                </div>

                {/* Status */}
                <label className="form-control w-full">
                    <div className="label"><span className="label-text font-medium">Status</span></div>
                    <select
                        className="select select-bordered w-full"
                        name="status"
                        value={activity.status}
                        onChange={handleChange}
                    >
                        <option value="draft">Draft (ร่าง)</option>
                        <option value="open">Open (เปิดรับสมัคร)</option>
                        <option value="closed">Closed (ปิดรับสมัคร)</option>
                        <option value="completed">Completed (เสร็จสิ้น)</option>
                    </select>
                </label>

            </div>
            
            <button 
                className="btn btn-primary btn-lg w-full mt-8 shadow-lg hover:shadow-xl transition duration-300" 
                onClick={handleSubmit}
            >
                Submit New Activity
            </button>
        </div>
    );
};

export default AddActivity;