
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserProfile, PregnancyStage } from '../types';

interface HomeProps {
  profile: UserProfile;
}

const Home: React.FC<HomeProps> = ({ profile }) => {
  const navigate = useNavigate();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const dayOfPregnancy = profile.currentWeek * 7;
  const totalPregnancyWeeks = 40;
  const weeksToGo = totalPregnancyWeeks - profile.currentWeek;
  
  const getStageImage = (week: number) => {
    // High-quality motherhood and baby images
    if (week <= 12) return "https://images.unsplash.com/photo-1544126592-807daa2b5282?auto=format&fit=crop&q=80&w=800"; // Newborn hands
    if (week <= 26) return "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=800"; // Mother and baby
    return "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=800"; // Happy mother
  };

  const getBabySize = (week: number) => {
    if (week < 4) return { name: "Poppy Seed", icon: "🌱" };
    if (week < 8) return { name: "Lentil", icon: "🥜" };
    if (week < 12) return { name: "Lime", icon: "🍋" };
    if (week < 16) return { name: "Avocado", icon: "🥑" };
    if (week < 20) return { name: "Banana", icon: "🍌" };
    if (week < 24) return { name: "Corn", icon: "🌽" };
    if (week < 28) return { name: "Eggplant", icon: "🍆" };
    if (week < 32) return { name: "Pineapple", icon: "🍍" };
    if (week < 36) return { name: "Cantaloupe", icon: "🍈" };
    return { name: "Watermelon", icon: "🍉" };
  };

  const babySize = getBabySize(profile.currentWeek);

  const getTrimester = (week: number) => {
    if (week <= 12) return PregnancyStage.FIRST_TRIMESTER;
    if (week <= 26) return PregnancyStage.SECOND_TRIMESTER;
    return PregnancyStage.THIRD_TRIMESTER;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Not set";
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-gray-50/30 pt-16 pb-32 px-5 max-w-lg mx-auto md:max-w-none">
      {/* Top Header */}
      <div className="flex justify-between items-center py-4 mb-2">
        <h1 className="text-3xl font-bold text-gray-900">Today</h1>
        <div className="flex gap-3">
          {/* Quick Call Button on Screen */}
          <button 
            onClick={() => navigate('/emergency')}
            className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
          >
            <i className="fa-solid fa-phone"></i>
          </button>
          <Link to="/setup" className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
             <i className="fa-solid fa-user text-gray-400"></i>
          </Link>
        </div>
      </div>

      {/* Main Development Card - Reduced even further to aspect-[21/9] for a sleek, compact look */}
      <div className="relative w-full aspect-[21/9] rounded-[2rem] overflow-hidden shadow-lg mb-6">
        <img 
          src={getStageImage(profile.currentWeek)} 
          alt="Motherhood"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>
        
        <div className="absolute top-4 left-6 text-white">
          <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">{getGreeting()}</p>
          <h2 className="text-xl font-bold leading-tight">{profile.name}</h2>
        </div>

        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
          <div className="text-white">
            <h3 className="text-lg font-bold leading-none">Day {dayOfPregnancy}</h3>
            <span className="text-[9px] font-black uppercase tracking-widest text-pink-300">{weeksToGo} Weeks to Go</span>
          </div>
          <button 
            onClick={() => navigate('/journal')}
            className="bg-white px-5 py-2 rounded-full flex items-center gap-2 font-black text-[10px] uppercase text-gray-900 shadow-xl active:scale-95 transition-all"
          >
            Log Today <i className="fa-solid fa-plus text-[8px]"></i>
          </button>
        </div>
      </div>

      {/* Progress & Stats Card */}
      <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-0.5">
            <h4 className="text-lg font-black text-gray-900 leading-none">{profile.currentWeek} Weeks</h4>
            <p className="text-[9px] text-pink-600 font-black uppercase tracking-widest">{getTrimester(profile.currentWeek)}</p>
          </div>
          <div className="text-right">
             <p className="text-[9px] font-bold text-gray-400 uppercase">Due Date</p>
             <p className="text-xs font-bold text-gray-700">{formatDate(profile.dueDate)}</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-pink-500 rounded-full" 
            style={{ width: `${(profile.currentWeek / 40) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-[8px] font-black text-gray-300 uppercase">Conception</span>
            <span className="text-[8px] font-black text-pink-400 uppercase">Delivery</span>
        </div>
      </div>

      {/* Baby Size Comparison - More Compact */}
      <div className="bg-white rounded-[1.5rem] p-4 border border-indigo-50 mb-6 flex items-center gap-4 shadow-sm">
         <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-white shrink-0">
            {babySize.icon}
         </div>
         <div className="flex-1">
            <p className="text-[8px] font-black uppercase tracking-widest text-indigo-400 mb-0.5">Current Size</p>
            <h4 className="text-md font-black text-gray-800 leading-tight">Like a {babySize.name}</h4>
            <p className="text-[10px] text-gray-400 mt-0.5">Developing gracefully.</p>
         </div>
      </div>

      {/* Quick Tools Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { icon: 'fa-list-check', label: 'Tasks', color: 'text-blue-500', bg: 'bg-blue-50', path: '/tasks' },
          { icon: 'fa-camera-retro', label: 'Gallery', color: 'text-purple-500', bg: 'bg-purple-50', path: '/journal' },
          { icon: 'fa-baby-carriage', label: 'Names', color: 'text-pink-500', bg: 'bg-pink-50', path: '/baby-names' }
        ].map((tool, i) => (
          <Link key={i} to={tool.path} className="flex flex-col items-center gap-1.5 group">
            <div className={`${tool.bg} ${tool.color} w-full aspect-square rounded-[1.5rem] flex items-center justify-center text-xl shadow-sm group-hover:bg-white group-hover:shadow-md transition-all border border-transparent group-hover:border-gray-100`}>
              <i className={`fa-solid ${tool.icon}`}></i>
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-800">{tool.label}</span>
          </Link>
        ))}
      </div>

      {/* Enhanced Call Action - Slimmer */}
      <div 
        onClick={() => navigate('/emergency')}
        className="bg-red-50 p-4 rounded-[1.5rem] border border-red-100 flex items-center gap-4 cursor-pointer hover:bg-red-100 transition-colors group shadow-sm"
      >
         <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-md shadow-lg group-hover:scale-110 transition-transform">
           <i className="fa-solid fa-phone-volume"></i>
         </div>
         <div className="flex-1">
            <h4 className="font-bold text-red-900 text-xs">Emergency Call</h4>
            <p className="text-[9px] text-red-700/60 font-medium leading-none">Quick dial your primary contacts.</p>
         </div>
         <i className="fa-solid fa-chevron-right text-red-300 text-[10px]"></i>
      </div>
    </div>
  );
};

export default Home;
