import { memo } from "react";

const CommonInfoCard = ({ title, description, list = [], className = '', children }) => {
  return (
    <div className={`bg-white rounded-md new_border box_shadow_common p-[15px] md:p-[30px] flex flex-col gap-[15px] ${className}`}>
      {title && <h2 className="commonQuesH2">{title}</h2>}
      {description && <p className="commonQuesP">{description}</p>}

      {/* UL list after heading/description */}
      {list.length > 0 && (
        <ul className="list-disc list-inside commonQuesP space-y-1">
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      {children}
    </div>
  );
};

export default memo(CommonInfoCard);
