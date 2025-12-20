import { useNavigate, useLocation } from 'react-router-dom';

export default function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const headingStyle = {
    fontFamily: 'Pretendard',
    fontSize: '17px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
  };

  const bodySmallBoldStyle = {
    fontFamily: 'Pretendard',
    fontSize: '15px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
  };

  const activeProjectStyle = {
    display: 'flex',
    width: '144.5px',
    padding: '7px 10px 7px 8px',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '5px',
  };

  const inactiveButtonMarginLeft = '61.5px';

  const menuSections = [
    {
      title: '관리 서비스',
      icon: '/src/assets/management_service.png',
      marginTop: '44px',
      marginBottom: '20px',
      homePath: '/management-home',
      subMenus: [
        { text: '전체 프로젝트 관리', path: '/project-management' },
        { text: '입고 업무 관리', path: '/inbound-task' },
        { text: '출하 업무 관리', path: '/outbound-task' },
        { text: '인사 관리', path: '/hrmanagement' },
      ],
    },
    {
      title: '재고 서비스',
      icon: '/src/assets/box.png',
      marginTop: '32px',
      marginBottom: '16px',
      homePath: '/inventory-home',
      subMenus: [
        { text: '입고 업무 관리', path: '/inventory-inbound-task' },
        { text: '재고 관리', path: '/inventory-stock' },
      ],
    },
    {
      title: '물류 서비스',
      icon: '/src/assets/delivery.png',
      marginTop: '32px',
      marginBottom: '16px',
      homePath: '/logistics-home',
      subMenus: [{ text: '출하 업무 관리', path: '/logistics-outbound-task' }],
    },
  ];

  const renderSubMenus = (subMenus: { text: string; path: string }[]) => {
    return subMenus.map((menu, index) => {
      const isProjectManagementActive =
        menu.path === '/project-management' && currentPath === '/project-create';
      const isActive = currentPath.startsWith(menu.path) || isProjectManagementActive;

      const marginTop = index === 0 ? '0px' : '10px';

      const baseLeftMargin = '61.5px';

      let buttonStyle: React.CSSProperties = {
        marginTop,
        marginLeft: baseLeftMargin,
        padding: '7px 10px 7px 8px',
        width: '144.5px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '5px',
      };

      let textClass = 'text-greyColor-grey600';
      let background = 'transparent';

      if (isActive) {
        background = 'rgba(0, 122, 255, 0.1)';
        textClass = 'text-mainColor-blue600';
      }

      return (
        <button
          key={menu.text + menu.path}
          onClick={() => navigate(menu.path)}
          className="flex items-center"
          style={{ ...buttonStyle, background }}
        >
          <span className={textClass} style={bodySmallBoldStyle}>
            {menu.text}
          </span>
        </button>
      );
    });
  };

  const topMenuTextStyle = {
    fontFamily: 'Pretendard',
    fontWeight: 400,
    fontSize: '17px',
    lineHeight: '100%',
  };

  return (
    <aside
      className="border-greyColor-200 flex flex-col border-r bg-white"
      style={{ width: '220px', height: '100vh', position: 'sticky', top: 0 }}
    >
      <button
        onClick={() => navigate('/management-home')}
        className="ml-[27px] mt-[38px] flex items-center"
      >
        <img src="/src/assets/logo.png" alt="logo" width={129} height={36.47} />
      </button>

      <button
        onClick={() => navigate('/logistics')}
        className="ml-[27px] mt-[32px] flex items-center gap-[10px]"
      >
        <img src="/src/assets/logistics.png" alt="logistics" width={24} height={24} />
        <span className="text-greyColor-grey600" style={topMenuTextStyle}>
          Logistics
        </span>
      </button>

      <button
        onClick={() => navigate('/owner')}
        className="ml-[27px] mt-[11px] flex items-center gap-[10px]"
      >
        <img src="/src/assets/owner.png" alt="owner" width={24} height={24} />
        <span className="text-greyColor-grey600" style={topMenuTextStyle}>
          Owner | 홍길동
        </span>
      </button>

      <button
        onClick={() => navigate('/home')}
        className="ml-[27px] flex items-center gap-[10px]"
        style={{ marginTop: '57.77px' }}
      >
        <img src="/src/assets/home.png" alt="home" width={20} height={20} />
        <span className="text-greyColor-grey900" style={headingStyle}>
          홈
        </span>
      </button>

      {menuSections.map((section) => (
        <div key={section.title}>
          <button
            onClick={() => {
              if (section.homePath) {
                navigate(section.homePath);
              }
            }}
            className="ml-[27px] flex w-full items-center gap-[10px] text-left"
            style={{
              marginTop: section.marginTop,
              marginBottom: section.marginBottom,
            }}
          >
            <img src={section.icon} alt={section.title} width={20} height={20} />
            <span className="text-greyColor-grey900" style={headingStyle}>
              {section.title}
            </span>
          </button>

          {renderSubMenus(section.subMenus)}
        </div>
      ))}
    </aside>
  );
}
