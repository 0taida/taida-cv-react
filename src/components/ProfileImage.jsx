const ProfileImage = () => {
  return (
    <img 
      src="/face.png" 
      alt="Profile Image" 
      className="w-[200px] h-[200px] rounded-full mx-auto my-8 border-2 border-[#00aaff] shadow-[0_4px_10px_rgba(0,0,0,0.3)] object-cover block animate-subtle-pulse-custom opacity-0 animate-fade-in-custom md:w-[100px] md:h-[100px] md:my-3"
    />
  );
};

export default ProfileImage;