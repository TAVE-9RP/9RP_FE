import React from 'react';
import { useNavigate } from 'react-router-dom';

interface TaskData {
  id: number;
  projectNumber: string;
  taskName: string;
  items: string;
  location: string;
  requestDate: string;
  manager: string;
  status: 'ALL' | 'TASK_ASSIGNMENT' | 'APPROVAL_PENDING' | 'IN_PROGRESS' | 'COMPLETED';
}

interface TaskListTableProps {
  data: TaskData[];
  isLoading: boolean;
  type: 'inbound' | 'outbound';
  basePath?: string;
}

export default function TaskListTable({
  data,
  isLoading,
  type,
  basePath: externalPath,
}: TaskListTableProps) {
  const navigate = useNavigate();

  const isOutbound = type === 'outbound';
  const basePath = isOutbound ? '/outbound-task' : '/inbound-task';
  const taskLabel = isOutbound ? '출하' : '입고';
  const finalPath = externalPath || (isOutbound ? '/outbound-task' : '/inbound-task');

  const handleRowClick = (projectNumber: string) => {
    navigate(`${finalPath}/${projectNumber}`);
  };

  const tableHeaderClasses =
    'py-3 px-4 font-bold text-sm text-greyColor-grey700 bg-subColor-orange050 border-b border-subColor-orange100 border-r border-greyColor-grey200';

  const tableCellClasses =
    'py-3 px-4 text-sm text-greyColor-grey800 border-b border-greyColor-grey200 border-r border-greyColor-grey200';

  const statusChipClasses = (status: TaskData['status']) => {
    const baseChipStyle =
      'inline-flex items-center justify-center rounded-full px-[10px] py-[4px] text-xs font-medium whitespace-nowrap';

    switch (status) {
      case 'TASK_ASSIGNMENT':
        return `${baseChipStyle} bg-greyColor-grey200 text-greyColor-grey600`;
      case 'APPROVAL_PENDING':
      case 'IN_PROGRESS':
        return `${baseChipStyle} bg-subColor-orange100 text-subColor-orange800`;
      case 'COMPLETED':
        return `${baseChipStyle} bg-mainColor-blue050 text-mainColor-blue600`;
      default:
        return `${baseChipStyle} bg-greyColor-grey200 text-greyColor-grey600`;
    }
  };

  const getStatusText = (status: TaskData['status']) => {
    switch (status) {
      case 'TASK_ASSIGNMENT':
        return '업무 할당';
      case 'APPROVAL_PENDING':
        return '승인 대기';
      case 'IN_PROGRESS':
        return '진행 중';
      case 'COMPLETED':
        return `${taskLabel} 완료`;
      default:
        return '알 수 없음';
    }
  };

  if (isLoading) {
    return <p className="py-10 text-center text-greyColor-grey500">목록을 불러오는 중...</p>;
  }

  return (
    <div className="overflow-x-auto border border-greyColor-grey200" style={{ width: '1040px' }}>
      <table className="min-w-full divide-y divide-greyColor-grey200">
        <thead className="bg-subColor-orange050">
          <tr>
            <th className={`${tableHeaderClasses} text-center`}>프로젝트 넘버</th>
            <th className={`${tableHeaderClasses} text-center`}>{taskLabel} 업무명</th>
            <th className={`${tableHeaderClasses} text-center`}>{taskLabel} 품목</th>
            <th className={`${tableHeaderClasses} text-center`}>위치</th>
            <th className={`${tableHeaderClasses} text-center`}>요청일</th>
            <th className={`${tableHeaderClasses} text-center`}>담당자</th>
            <th className={`${tableHeaderClasses} border-r-0 text-center`}>진행 상태</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-greyColor-grey200 bg-white">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className={`${tableCellClasses} border-r-0 text-center text-greyColor-grey500`}
              >
                해당 업무 목록이 없습니다.
              </td>
            </tr>
          ) : (
            data.map((task) => (
              <tr
                key={task.id}
                className="cursor-pointer transition duration-150 hover:bg-mainColor-blue050"
                onClick={() => handleRowClick(task.projectNumber)}
              >
                <td className={`${tableCellClasses} font-mono`}>{task.projectNumber}</td>
                <td className={tableCellClasses}>{task.taskName}</td>
                <td className={tableCellClasses}>{task.items}</td>
                <td className={tableCellClasses}>{task.location}</td>
                <td className={tableCellClasses}>{task.requestDate}</td>
                <td className={tableCellClasses}>{task.manager}</td>
                <td className={`${tableCellClasses} border-r-0 text-center`}>
                  <span className={statusChipClasses(task.status)}>
                    {getStatusText(task.status)}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
