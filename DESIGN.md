# Technical Design Document — Generation Thailand React Assessment

## 1. Component Architecture

### การแบ่ง UI เป็น Components

โปรเจกต์นี้แบ่ง UI ออกเป็น components ดังนี้:

#### Core Components

- **App.jsx** — Root component ที่จัดการ routing ด้วย React Router
- **Navbar.jsx** — Navigation bar แสดงลิงก์ Home และ Owner พร้อม highlight active route
- **Home.jsx** — หน้าหลักที่มี tab switching ระหว่าง User และ Admin section

#### Feature Components

- **UserSection.jsx** — แสดงตาราง members แบบ read-only สำหรับ user
- **AdminSection.jsx** — แสดงฟอร์มสร้าง member และตารางพร้อมปุ่ม delete
- **MembersTable.jsx** — Reusable table component รับ props เพื่อแสดงข้อมูลและควบคุม actions
- **Owner.jsx** — หน้าแสดงข้อมูลเจ้าของโปรเจกต์

### เหตุผลในการแบ่ง Components

1. **Separation of Concerns** — แต่ละ component มีหน้าที่เฉพาะ ทำให้โค้ดอ่านง่ายและแก้ไขง่าย
2. **Reusability** — `MembersTable` สามารถใช้ซ้ำได้ทั้งใน User และ Admin section โดยควบคุมพฤติกรรมผ่าน props
3. **Maintainability** — เมื่อต้องแก้ไข UI ส่วนใดส่วนหนึ่ง ไม่กระทบกับส่วนอื่น
4. **Scalability** — สามารถเพิ่ม features ใหม่ได้ง่ายโดยไม่ต้องแก้โค้ดเดิมมาก

---

## 2. State Management

### State Variables ที่สร้างและเหตุผล

#### Home.jsx

```javascript
const [activeSection, setActiveSection] = useState("user");
```

- **เหตุผล:** ควบคุมว่าจะแสดง UserSection หรือ AdminSection
- **ทำไมต้องเป็น state:** เพราะต้อง re-render เมื่อผู้ใช้คลิกเปลี่ยน tab

#### UserSection.jsx & AdminSection.jsx

```javascript
const [members, setMembers] = useState([]);
const [loading, setLoading] = useState(true);
```

- **members:** เก็บข้อมูล members ที่ดึงมาจาก API
- **loading:** แสดงสถานะการโหลดข้อมูล
- **เหตุผล:** ข้อมูลจาก API เป็น asynchronous ต้องใช้ state เพื่อเก็บและแสดงผลเมื่อได้รับข้อมูล

#### AdminSection.jsx (เพิ่มเติม)

```javascript
const [formData, setFormData] = useState({
  name: "",
  lastName: "",
  position: "",
});
```

- **เหตุผล:** เก็บค่าที่ผู้ใช้กรอกในฟอร์ม (controlled components)
- **ข้อดี:** สามารถ validate, reset, หรือจัดการข้อมูลก่อนส่ง API ได้ง่าย

---

## 3. State Management Strategy: Passing Props vs React Context

### วิธีที่ใช้: **Passing Props**

ในโปรเจกต์นี้เลือกใช้ **Passing Props** เพราะ:

1. **Component Tree ไม่ลึก** — ข้อมูลส่งผ่านแค่ 1-2 ระดับ (Home → UserSection/AdminSection → MembersTable)
2. **ข้อมูลไม่ซับซ้อน** — แต่ละ section จัดการ state ของตัวเองอิสระ ไม่ต้องแชร์ข้อมูลข้าม sections
3. **ง่ายต่อการ Debug** — เห็น data flow ชัดเจนว่าข้อมูลไหลจากไหนไปไหน

### เมื่อไหร่ควรใช้ React Context?

ควรใช้ Context เมื่อ:

- มี global state ที่หลาย components ต้องใช้ร่วมกัน (เช่น user authentication, theme)
- Component tree ลึกมาก (prop drilling มากกว่า 3-4 ระดับ)
- ต้องการ centralized state management

**ตัวอย่าง:** ถ้าโปรเจกต์นี้มีระบบ login และต้องแสดงข้อมูล user ทุกหน้า ควรใช้ Context แทน

---

## 4. การใช้ useEffect Hook

### ใช้ใน UserSection.jsx และ AdminSection.jsx

```javascript
useEffect(() => {
  fetchMembers();
}, []);
```

### เหตุผล

1. **Side Effect Management** — การเรียก API เป็น side effect ที่ไม่ควรทำใน render function โดยตรง
2. **Component Lifecycle** — `useEffect` ทำให้เราควบคุมได้ว่าเมื่อไหร่จะเรียก API (ในกรณีนี้คือตอน component mount ครั้งแรก)
3. **Dependency Array `[]`** — ทำให้ fetch ครั้งเดียวตอน mount ไม่ fetch ซ้ำทุกครั้งที่ re-render

### ถ้าไม่ใช้ useEffect จะเกิดอะไร?

```javascript
// ❌ ผิด — จะเกิด infinite loop
function UserSection() {
  const [members, setMembers] = useState([]);

  fetchMembers(); // เรียกทุกครั้งที่ render → setMembers → re-render → เรียกอีก

  return <MembersTable members={members} />;
}
```

---

## 5. สามารถใช้ fetch() โดยไม่มี useEffect ได้ไหม?

### คำตอบ: **ได้ แต่มีข้อจำกัด**

#### กรณีที่ใช้ได้โดยไม่ต้องมี useEffect:

1. **Event Handler**

```javascript
const handleClick = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  setMembers(data);
};

return <button onClick={handleClick}>Load Data</button>;
```

- ใช้ได้เพราะ fetch เกิดจาก user action ไม่ใช่ตอน render

2. **React Server Components (RSC)** — ใน Next.js 13+ สามารถ fetch ใน component ได้โดยตรง

#### กรณีที่ต้องใช้ useEffect:

- **Auto-fetch on mount** — ต้องการให้ดึงข้อมูลทันทีที่ component แสดง
- **Fetch based on props/state changes** — เช่น ดึงข้อมูลใหม่เมื่อ user เปลี่ยน filter

### สรุป

ถ้าต้องการ fetch ทันทีตอน component mount → **ต้องใช้ useEffect**

---

## 6. fetch() ควรเป็น Synchronous หรือ Asynchronous?

### คำตอบ: **Asynchronous เท่านั้น**

### เหตุผล

1. **Network Request ใช้เวลา** — การเรียก API ผ่าน internet อาจใช้เวลา 100ms - หลายวินาที
2. **Non-blocking** — ถ้าเป็น synchronous จะ block UI ทำให้หน้าเว็บค้างจนกว่าจะได้ response
3. **JavaScript Single-threaded** — ถ้า block main thread จะทำให้ user ไม่สามารถโต้ตอบกับหน้าเว็บได้

### ตัวอย่างการใช้งาน

```javascript
// ✅ ถูกต้อง — Asynchronous
const fetchMembers = async () => {
  setLoading(true);
  const response = await fetch(API_URL);
  const data = await response.json();
  setMembers(data);
  setLoading(false);
};

// ❌ ไม่มี Synchronous fetch ใน JavaScript
// fetch() จะ return Promise เสมอ
```

### ข้อดีของ Async

- UI ยังคงตอบสนองได้ขณะรอข้อมูล
- สามารถแสดง loading state ให้ user เห็น
- สามารถ handle error ได้ดีกว่า

---

## 7. ข้อสังเกตและคำถามเพิ่มเติม

### ข้อสังเกต

1. **Error Handling** — ปัจจุบันใช้แค่ `console.error` ควรเพิ่ม UI แสดง error message ให้ user เห็น
2. **Loading State** — มีการแสดง "Loading..." แต่อาจเพิ่ม skeleton loading หรือ spinner ให้สวยกว่านี้
3. **Form Validation** — ใช้แค่ `required` attribute อาจเพิ่ม validation เพิ่มเติม (เช่น ความยาวตัวอักษร)
4. **Optimistic UI** — ตอนลบ member อาจแสดงผลทันทีก่อนรอ API response เพื่อ UX ที่ดีขึ้น

### คำถามเพิ่มเติม

1. **ควรใช้ React Query หรือ SWR ไหม?**
   - ถ้าโปรเจกต์ใหญ่ขึ้น ควรพิจารณาใช้ library เหล่านี้เพื่อจัดการ caching, refetching, และ error handling

2. **ควรแยก API calls ออกเป็น service layer ไหม?**
   - ใช่ ควรสร้าง `api/members.js` เพื่อรวม API calls ไว้ที่เดียว ทำให้แก้ไข URL หรือ headers ได้ง่าย

3. **ควรใช้ TypeScript ไหม?**
   - ถ้าโปรเจกต์ใหญ่ขึ้น TypeScript จะช่วยลด bugs จาก type errors

4. **ควรเพิ่ม Unit Tests ไหม?**
   - ใช่ ควรเขียน tests สำหรับ components และ API calls ด้วย Jest + React Testing Library

---

## สรุป

โปรเจกต์นี้ใช้ React patterns พื้นฐานที่ดี:

- Component composition เพื่อ reusability
- Props drilling สำหรับ data flow ที่ชัดเจน
- useEffect สำหรับ side effects
- Async/await สำหรับ API calls

สำหรับโปรเจกต์ขนาดนี้ architecture ที่ใช้เหมาะสม แต่ถ้าขยายใหญ่ขึ้นควรพิจารณา:

- State management library (Redux, Zustand)
- Data fetching library (React Query, SWR)
- TypeScript สำหรับ type safety
- Testing framework สำหรับ quality assurance
