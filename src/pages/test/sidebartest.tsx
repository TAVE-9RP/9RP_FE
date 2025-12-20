import SideBar from '../../components/common/SideBar';

function Sidebartest() {
  return (
    <div className="flex">
      <SideBar />
      <main className="flex-1">{/* 여기에 나머지 페이지 */}</main>
    </div>
  );
}

export default Sidebartest;
