import { CalendarDays, LucideIcon, Newspaper, UsersRound } from "lucide-react";
import teacher from "@/shared/assets/teacher-minhhoa.png";
import student from "@/shared/assets/student-minhhoa.png";

interface cardProps {
  icon: LucideIcon;
  title: string;
  content: string;
}

const Card = ({ icon: Icon, title, content }: cardProps) => {
  return (
    <div className="flex flex-col items-center gap-4 shadow-lg p-6">
      <div className="bg-blue-700 p-6 rounded-xl mb-20">
        <Icon size={50} color="white" />
      </div>
      <h2 className="min-h-[80px] text-sm text-center font-bold text-violet-600">
        {title}
      </h2>
      <h3 className="text-center">{content}</h3>
    </div>
  );
};

const Body = () => {
  return (
    <div className="container mx-auto flex flex-col gap-20">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-base text-center">
          All-In-One <strong className="text-red-400">Cloud Software</strong>
        </h2>
        <h3 className="text-center text-sm max-w-[900px]">
          Skilline is one powerful online software suite that combines all the
          tools needed to run a successful school or office.
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-40">
        <Card
          icon={Newspaper}
          title="Online Billing, Invoicing, & Contracts"
          content="Simple and secure control of your organization’s financial and legal transactions. Send customized invoices and contracts"
        />
        <Card
          icon={CalendarDays}
          title="Easy Scheduling & Attendance Tracking"
          content="Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance"
        />
        <Card
          icon={UsersRound}
          title="Customer Tracking"
          content="Automate and track emails to individuals or groups. Skilline’s built-in system helps organize your organization "
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="text-lg">
          What is <strong className="text-red-400">Skilline</strong>
        </h2>
        <h3 className="max-w-[1000px] text-center">
          Skilline is a platform that allows educators to create online classes
          whereby they can store the course materials online; manage
          assignments, quizzes and exams; monitor due dates; grade results and
          provide students with feedback all in one place.
        </h3>
      </div>

      <div className="flex justify-center gap-20">
        <div className="relative">
          <img src={teacher} className="w-full" />
          <div className="font-bold text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4">
            <h2 className="uppercase text-base">FOR INSTRUCTORS</h2>
            <button className="text-white border border-white p-4 rounded-base">
              Start a class today
            </button>
          </div>
        </div>
        <div className="relative">
          <img src={student} className="w-full" />
          <div className="font-bold text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4">
            <h2 className="uppercase text-base">FOR STUDENTS</h2>
            <button className="bg-cyan-400 text-white p-4 rounded-base">
              Enter access code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
