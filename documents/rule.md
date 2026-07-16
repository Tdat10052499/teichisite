# SYSTEM RULES - CORE WORKFLOW & ENVIRONMENT

## 1. Môi Trường & Dependencies (FROZEN - KHÓA MÔI TRƯỜNG)
- **Tech Stack cốt lõi:** Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Wagmi, Viem, RainbowKit.
- **Quy tắc tuyệt đối:** KHÔNG đề xuất, KHÔNG tự ý cài đặt thêm bất kỳ thư viện (npm/yarn packages) hoặc công cụ nào khác ngoài những thứ đã setup, trừ khi được Human Developer yêu cầu một cách rõ ràng.

## 2. Tiêu Chuẩn Phản Hồi của AI Agent
- **Tối ưu Token:** Không giải thích dông dài. Đi thẳng vào vấn đề và giải pháp.
- **Cập nhật Code:** Khi có chỉnh sửa, chỉ in ra đoạn code (block code) cần thay đổi hoặc file mới được tạo. Tuyệt đối KHÔNG in lại toàn bộ file nếu chỉ sửa một vài dòng. 
- **Định vị File:** Bắt buộc cung cấp đường dẫn file (file path) rõ ràng ở dòng đầu tiên trước mỗi block code (vd: `src/components/ui/Button.tsx`).
- **Giao tiếp:** Giữ thái độ chuyên nghiệp, ngắn gọn.

## 3. Quản Lý Tài Nguyên & Nội Dung (Assets)
- **Mã QR:** Bắt buộc phải sử dụng đúng mã QR code đã được cung cấp cho bất kỳ tính năng nào yêu cầu quét mã. Tuyệt đối không tự ý sinh mã (generate) hoặc dùng placeholder giả lập từ API bên ngoài.
- **Bảo mật:** Không hardcode bất kỳ Private Key, API Key, hay thông tin nhạy cảm nào vào source code. Luôn gọi qua biến môi trường (ví dụ: `process.env.NEXT_PUBLIC_...`).

## 4. Tiêu Chuẩn Code (Coding Conventions)
- **TypeScript:** Bật chế độ Strict Mode. Định nghĩa type/interface rõ ràng cho mọi Props, State, và Smart Contract ABIs. Khống chế tối đa việc sử dụng `any`.
- **Cấu trúc Thư mục & Component:** 
  - Tách biệt rõ ràng logic Web3 (gọi on-chain, hooks) ra khỏi logic render UI.
  - Sử dụng pattern component nhỏ, gọn và có tính tái sử dụng cao.
- **Styling:** Quản lý class của Tailwind CSS thông qua thư viện hỗ trợ như `clsx` và `tailwind-merge` để xử lý logic class động một cách an toàn, chống xung đột.