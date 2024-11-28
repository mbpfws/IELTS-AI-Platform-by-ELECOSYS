import { Sidebar } from "@/components/Sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-[#E6EEF8] to-[#F5F7FA]">
      <Sidebar />
      
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="p-8 bg-white/50 backdrop-blur-sm rounded-xl shadow-[6px_6px_12px_rgba(163,177,198,0.6),-6px_-6px_12px_rgba(255,255,255,0.8)]">
            <h1 className="text-3xl font-bold text-slate-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#2D5C8F] to-[#4C9AFF]">
              Xây dựng AI Agent cho luyện thi IELTS
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl leading-relaxed">
              Nền tảng AI thông minh giúp bạn tạo và tùy chỉnh các AI Agent chuyên biệt cho việc luyện thi IELTS. 
              Với công nghệ Google Gemini AI mới nhất, các agent có thể tương tác đa phương tiện và cung cấp phản hồi chi tiết.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/agents/create" 
                className="group p-6 bg-white/80 rounded-xl transition-all duration-300
                  shadow-[6px_6px_12px_rgba(163,177,198,0.6),-6px_-6px_12px_rgba(255,255,255,0.8)]
                  hover:shadow-[8px_8px_16px_rgba(163,177,198,0.7),-8px_-8px_16px_rgba(255,255,255,0.9)]
                  hover:translate-y-[-4px] hover:bg-gradient-to-br from-white to-[#F0F4F8]">
                <div className="flex flex-col items-start gap-4">
                  <PlusCircle className="h-8 w-8 text-[#4C9AFF] group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Tạo Agent Mới</h3>
                    <p className="text-sm text-slate-600">Tùy chỉnh AI agent theo mục tiêu học tập của bạn</p>
                  </div>
                </div>
              </Link>

              <Link href="/agents/writing"
                className="group p-6 bg-white/80 rounded-xl transition-all duration-300
                  shadow-[6px_6px_12px_rgba(163,177,198,0.6),-6px_-6px_12px_rgba(255,255,255,0.8)]
                  hover:shadow-[8px_8px_16px_rgba(163,177,198,0.7),-8px_-8px_16px_rgba(255,255,255,0.9)]
                  hover:translate-y-[-4px] hover:bg-gradient-to-br from-white to-[#F0F4F8]">
                <div className="h-full">
                  <h3 className="font-semibold text-slate-800 mb-3">Writing Agent</h3>
                  <p className="text-sm text-slate-600 mb-4">Agent chuyên biệt cho luyện thi IELTS Writing</p>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4C9AFF]"></span>
                      Phân tích và chấm điểm bài viết
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4C9AFF]"></span>
                      Gợi ý cải thiện từ vựng và ngữ pháp
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4C9AFF]"></span>
                      Mẫu câu và cấu trúc theo band điểm
                    </li>
                  </ul>
                </div>
              </Link>

              <Link href="/agents/speaking"
                className="group p-6 bg-white/80 rounded-xl transition-all duration-300
                  shadow-[6px_6px_12px_rgba(163,177,198,0.6),-6px_-6px_12px_rgba(255,255,255,0.8)]
                  hover:shadow-[8px_8px_16px_rgba(163,177,198,0.7),-8px_-8px_16px_rgba(255,255,255,0.9)]
                  hover:translate-y-[-4px] hover:bg-gradient-to-br from-white to-[#F0F4F8]">
                <div className="h-full">
                  <h3 className="font-semibold text-slate-800 mb-3">Speaking Agent</h3>
                  <p className="text-sm text-slate-600 mb-4">Agent chuyên biệt cho luyện thi IELTS Speaking</p>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4C9AFF]"></span>
                      Phản hồi phát âm thời gian thực
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4C9AFF]"></span>
                      Mô phỏng phỏng vấn speaking test
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4C9AFF]"></span>
                      Gợi ý cải thiện fluency và coherence
                    </li>
                  </ul>
                </div>
              </Link>
            </div>

            <div className="mt-12 space-y-6">
              <h2 className="text-xl font-semibold text-slate-800">Tính năng nổi bật</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-white/60 rounded-lg shadow-[4px_4px_8px_rgba(163,177,198,0.4),-4px_-4px_8px_rgba(255,255,255,0.6)]">
                  <h3 className="font-medium text-slate-800 mb-2">Google Gemini AI</h3>
                  <p className="text-sm text-slate-600">Sử dụng các model AI tiên tiến nhất từ Google cho khả năng tương tác đa phương tiện</p>
                </div>
                <div className="p-6 bg-white/60 rounded-lg shadow-[4px_4px_8px_rgba(163,177,198,0.4),-4px_-4px_8px_rgba(255,255,255,0.6)]">
                  <h3 className="font-medium text-slate-800 mb-2">Tùy chỉnh linh hoạt</h3>
                  <p className="text-sm text-slate-600">Điều chỉnh agent theo nhu cầu với các tham số như temperature, output length, và response format</p>
                </div>
                <div className="p-6 bg-white/60 rounded-lg shadow-[4px_4px_8px_rgba(163,177,198,0.4),-4px_-4px_8px_rgba(255,255,255,0.6)]">
                  <h3 className="font-medium text-slate-800 mb-2">Lưu trữ & Theo dõi</h3>
                  <p className="text-sm text-slate-600">Lưu lại lịch sử học tập và theo dõi tiến độ qua thời gian</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
