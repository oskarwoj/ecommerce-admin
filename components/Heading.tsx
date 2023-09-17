"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      dadas
      <div className="border-b-gray-600 text-2xl font-bold text-black">
        {title}
      </div>
      <div className="mt-2 font-light text-neutral-700">{subtitle}</div>
    </div>
  );
};

export default Heading;
