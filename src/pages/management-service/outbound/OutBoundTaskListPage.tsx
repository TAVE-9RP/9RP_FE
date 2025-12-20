import React, { useState, useEffect } from 'react';
import SearchBar from '../../../components/common/SearchBar';
import SideBar from '../../../components/common/SideBar';
import ProjectStatusButton from '../../../components/common/ProjectStatusButton';
import TaskListTable from '../../../components/common/TaskListTable';

interface OutboundTask {
  id: number;
  projectNumber: string;
  taskName: string;
  items: string;
  location: string;
  requestDate: string;
  manager: string;
  status: 'ALL' | 'TASK_ASSIGNMENT' | 'APPROVAL_PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

const MOCK_INBOUND_TASK_LIST: OutboundTask[] = [
  {
    id: 1,
    projectNumber: 'SYS-01-001',
    taskName: '강아지 껌 대량 출고',
    items: '강아지 껌',
    location: '위치입니다.',
    requestDate: '2025-10-25',
    manager: '강아껌',
    status: 'APPROVAL_PENDING',
  },
  {
    id: 2,
    projectNumber: 'SYS-01-002',
    taskName: '밥주세요',
    items: '애플망고 외 3...',
    location: '위치입니다.',
    requestDate: '2025-10-25',
    manager: '홍길동',
    status: 'APPROVAL_PENDING',
  },
  {
    id: 3,
    projectNumber: 'SYS-01-003',
    taskName: '쫀득쿠키',
    items: '쫀득쿠키',
    location: '위치입니다.',
    requestDate: '2025-10-25',
    manager: '김쫀득',
    status: 'IN_PROGRESS',
  },
  {
    id: 4,
    projectNumber: 'SYS-01-004',
    taskName: '두쫀쿠',
    items: '두바이쫀득쿠키',
    location: '위치입니다.',
    requestDate: '2025-10-25',
    manager: '두바이',
    status: 'COMPLETED',
  },
  {
    id: 5,
    projectNumber: 'SYS-01-005',
    taskName: '얼망고',
    items: '망고',
    location: '위치입니다.',
    requestDate: '2025-10-25',
    manager: '망고짱',
    status: 'TASK_ASSIGNMENT',
  },
  {
    id: 6,
    projectNumber: 'SYS-01-006',
    taskName: '업무명입니다.',
    items: '애플망고 외 3...',
    location: '위치입니다.',
    requestDate: '2025-10-25',
    manager: '홍길동',
    status: 'IN_PROGRESS',
  },
  {
    id: 7,
    projectNumber: 'SYS-01-007',
    taskName: '포테이토피자',
    items: '피자300판',
    location: '위치입니다.',
    requestDate: '2025-10-25',
    manager: '박하은',
    status: 'IN_PROGRESS',
  },
  {
    id: 6,
    projectNumber: 'SYS-01-008',
    taskName: '페퍼로니피자',
    items: '피자500판',
    location: '위치입니다.',
    requestDate: '2025-10-25',
    manager: '피자최고',
    status: 'TASK_ASSIGNMENT',
  },
];

const INITIAL_STATUS_DATA = [
  { status: 'ALL', label: '전체', count: MOCK_INBOUND_TASK_LIST.length },
  {
    status: 'TASK_ASSIGNMENT',
    label: '업무 할당',
    count: MOCK_INBOUND_TASK_LIST.filter((t) => t.status === 'TASK_ASSIGNMENT').length,
  },
  {
    status: 'APPROVAL_PENDING',
    label: '승인 대기',
    count: MOCK_INBOUND_TASK_LIST.filter((t) => t.status === 'APPROVAL_PENDING').length,
  },
  {
    status: 'IN_PROGRESS',
    label: '진행중',
    count: MOCK_INBOUND_TASK_LIST.filter((t) => t.status === 'IN_PROGRESS').length,
  },
  {
    status: 'COMPLETED',
    label: '완료',
    count: MOCK_INBOUND_TASK_LIST.filter((t) => t.status === 'COMPLETED').length,
  },
];

const pageTitleStyle = {
  color: '#000',
  fontFamily: 'Pretendard',
  fontSize: '24px',
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
};

export default function OutboundTaskListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  // '전체'를 초기 활성 상태로 설정
  const [activeStatus, setActiveStatus] = useState<OutboundTask['status']>('ALL');
  const [taskList, setTaskList] = useState<OutboundTask[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // 상태에 따라 목록 필터링 (API 호출 모방)
  const fetchTasksByStatus = (status: OutboundTask['status']) => {
    setIsLoading(true);

    setTimeout(() => {
      let filteredList: OutboundTask[];
      if (status === 'ALL') {
        filteredList = MOCK_INBOUND_TASK_LIST;
      } else {
        filteredList = MOCK_INBOUND_TASK_LIST.filter((task) => task.status === status);
      }

      // 검색어 필터링 적용 (프로젝트 넘버 또는 업무명)
      const finalFilteredList = filteredList.filter(
        (task) => task.projectNumber.includes(searchTerm) || task.taskName.includes(searchTerm),
      );

      setTaskList(finalFilteredList);
      setIsLoading(false);
    }, 300); // 로딩 시뮬레이션
  };

  const handleStatusClick = (status: OutboundTask['status']) => {
    if (activeStatus === status) return;
    setActiveStatus(status);
  };

  // 검색어나 활성 상태가 변경될 때마다 목록을 다시 가져옴
  useEffect(() => {
    fetchTasksByStatus(activeStatus);
  }, [activeStatus, searchTerm]); // 검색어도 의존성 배열에 포함

  return (
    <div className="flex min-h-screen w-full">
      <SideBar />

      <main className="flex-1 bg-white">
        <div className="mt-5 pl-[70px] pr-10 pt-10">
          <h1 style={pageTitleStyle}>출하 업무 리스트</h1>
          <div className="mt-12 w-[1040px]">
            <SearchBar
              placeholder="출하 프로젝트 검색"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="mb-6 mt-5 flex w-[1040px] items-center justify-start">
            <div className="flex gap-4">
              {INITIAL_STATUS_DATA.map((item) => (
                <ProjectStatusButton
                  key={item.status}
                  label={item.label}
                  count={item.count}
                  isActive={activeStatus === item.status}
                  onClick={() => handleStatusClick(item.status as OutboundTask['status'])}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="pl-[70px] pr-10">
          <TaskListTable data={taskList} isLoading={isLoading} type="outbound" />
        </div>
      </main>
    </div>
  );
}
