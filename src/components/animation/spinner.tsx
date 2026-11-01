import icon from "@/assets/icons/spinner.svg";
import Image from "next/image";

const Spinner = ({ className = "", size = "130px" }) => {
  return (
    <div className={`flex items-center justify-center h-full ${className}`}>
      <Image
        src={icon}
        alt="spinner"
        width={500}
        height={500}
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Spinner;
