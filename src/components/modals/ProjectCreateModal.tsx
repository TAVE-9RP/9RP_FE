import React from 'react';

const WARNING_ICON_SRC = 'src/assets/projectcreatemodal.png';

const modalTextStyle: React.CSSProperties = {
  color: '#000',
  textAlign: 'center',
  fontFamily: 'Pretendard',
  fontSize: '19px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
};

const baseButtonStyle: React.CSSProperties = {
  display: 'flex',
  width: '70px',
  height: '35px',
  padding: '10px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontFamily: 'Pretendard',
  fontSize: '15px',
  fontWeight: 500,
  lineHeight: 'normal',
};

const cancelButton: React.CSSProperties = {
  ...baseButtonStyle,
  border: '1px solid var(--greyColor-grey300, #C5C8CE)',
  background: 'var(--greyColor-grey050, #FDFDFD)',
  color: '#000',
};

const confirmButton: React.CSSProperties = {
  ...baseButtonStyle,
  background: 'var(--mainColor-blue600, #007EF4)',
  color: '#FFF',
  border: 'none',
};

interface ProjectCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;

  message?: string;
}

const ProjectCreateModal: React.FC<ProjectCreateModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message = '프로젝트를 생성하시겠습니까?',
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        style={{
          width: '450px',
          height: '230px',
          borderRadius: '20px',
          background: '#FFF',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '30px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ marginBottom: '20px', marginTop: '10px' }}>
          <img src={WARNING_ICON_SRC} alt="경고 아이콘" style={{ width: '30px', height: '30px' }} />
        </div>

        <p style={modalTextStyle}>{message}</p>

        <div className="flex justify-center gap-[15px]" style={{ marginTop: '30px' }}>
          <button style={cancelButton} onClick={onClose}>
            취소
          </button>
          <button style={confirmButton} onClick={onConfirm}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCreateModal;
