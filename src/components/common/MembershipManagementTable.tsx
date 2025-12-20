// src/components/hr/MembershipManagementTable.tsx

import React, { useState, useEffect, useMemo } from 'react';
import Dropdown from '../common/Dropdown';

// --- 타입 정의 (HRManagementPage.tsx와 동일해야 합니다) ---
interface Employee {
  id: number;
  name: string; // 이름
  department: string; // 부서
  position: string; // 직급
  email: string; // 이메일
  status: '요청 대기' | '승인' | '거절'; // 가입 상태
}

interface MembershipManagementTableProps {
  searchTerm: string;
  isLoading: boolean; // 상위 컴포넌트에서 로딩 상태를 관리한다고 가정
}

// --- 더미 데이터 (가입 관리 목록) ---
const MOCK_MEMBERSHIP_LIST: Employee[] = [
  {
    id: 101,
    name: '박하은',
    department: '물류 1팀',
    position: '인턴',
    email: 'hong.gd@nexerp.com',
    status: '요청 대기',
  },
  {
    id: 102,
    name: '고양이',
    department: '물류 1팀',
    position: '인턴',
    email: 'kim.cs@nexerp.com',
    status: '승인',
  },
  {
    id: 103,
    name: '이영희',
    department: '경영지원',
    position: '매니저',
    email: 'lee.yh@nexerp.com',
    status: '거절',
  },
  {
    id: 104,
    name: '박민준',
    department: '물류 2팀',
    position: '인턴',
    email: 'park.mj@nexerp.com',
    status: '거절',
  },
  {
    id: 105,
    name: '최현우',
    department: '물류 1팀',
    position: '인턴',
    email: 'choi.hw@nexerp.com',
    status: '요청 대기',
  },
  {
    id: 106,
    name: '신지혜',
    department: '재고 관리',
    position: '대리',
    email: 'shin.jh@nexerp.com',
    status: '승인',
  },
];

const STATUS_OPTIONS: Employee['status'][] = ['요청 대기', '승인', '거절'];
const TABLE_WIDTH = '1040px';

export default function MembershipManagementTable({
  searchTerm,
  isLoading: parentLoading,
}: MembershipManagementTableProps) {
  const [membershipList, setMembershipList] = useState<Employee[]>([]);
  const [statusChanges, setStatusChanges] = useState<Record<number, Employee['status']>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    setLocalLoading(true);
    // 실제 API 호출 로직은 여기에서 구현
    setTimeout(() => {
      setMembershipList(MOCK_MEMBERSHIP_LIST);
      setLocalLoading(false);
    }, 300);
  }, []);

  const filteredList = useMemo(() => {
    if (!membershipList.length) return [];
    if (!searchTerm) return membershipList;

    const lowerCaseSearch = searchTerm.toLowerCase();

    return membershipList.filter(
      (employee) =>
        employee.name.toLowerCase().includes(lowerCaseSearch) ||
        employee.department.toLowerCase().includes(lowerCaseSearch) ||
        employee.position.toLowerCase().includes(lowerCaseSearch) ||
        employee.email.toLowerCase().includes(lowerCaseSearch),
    );
  }, [membershipList, searchTerm]);

  const handleStatusChange = (employeeId: number, newStatus: Employee['status']) => {
    setStatusChanges((prev) => ({
      ...prev,
      [employeeId]: newStatus,
    }));
  };

  const handleSave = () => {
    if (Object.keys(statusChanges).length === 0) {
      console.log('변경된 가입 상태가 없습니다.');
      return;
    }

    setIsSaving(true);
    console.log('--- 가입 상태 저장 요청 시작 ---');
    console.log('변경 사항:', statusChanges);

    setTimeout(() => {
      // 로컬 상태 업데이트
      setMembershipList((prevList) =>
        prevList.map((emp) =>
          statusChanges[emp.id] ? { ...emp, status: statusChanges[emp.id] } : emp,
        ),
      );

      // 변경 사항 초기화
      setStatusChanges({});
      setIsSaving(false);
      console.log('가입 상태가 저장되었습니다.');
      console.log('--- 가입 상태 저장 완료 ---');
    }, 1000);
  };

  const isDirty = Object.keys(statusChanges).length > 0;
  const isLoading = parentLoading || localLoading; // 부모/자식 로딩 상태 통합

  const tableHeaderClasses =
    'py-3 px-4 font-bold text-sm text-greyColor-grey700 bg-subColor-orange050 border-b border-subColor-orange100 border-r border-greyColor-grey200';

  const tableCellClasses =
    'py-2 px-4 text-sm text-greyColor-grey800 border-b border-greyColor-grey200 border-r border-greyColor-grey200';

  if (isLoading) {
    return <p className="py-10 text-center text-greyColor-grey500">가입 목록을 불러오는 중...</p>;
  }

  return (
    <div className="flex flex-col items-start" style={{ width: TABLE_WIDTH }}>
      <div className="mb-8 w-full overflow-x-auto border border-greyColor-grey200">
        <table className="min-w-full divide-y divide-greyColor-grey200">
          <thead className="bg-subColor-orange050">
            <tr>
              <th className={`${tableHeaderClasses} w-[100px] text-left`}>이름</th>
              <th className={`${tableHeaderClasses} w-[150px] text-left`}>부서</th>
              <th className={`${tableHeaderClasses} w-[150px] text-left`}>직급</th>
              <th className={`${tableHeaderClasses} text-left`}>이메일</th>
              <th className={`${tableHeaderClasses} border-r-0 text-center`}>가입 상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-greyColor-grey200 bg-white">
            {filteredList.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className={`${tableCellClasses} border-r-0 text-center text-greyColor-grey500`}
                >
                  가입 요청 목록이 없습니다.
                </td>
              </tr>
            ) : (
              filteredList.map((employee) => {
                // 현재 설정된 상태 (변경 사항이 있으면 변경 사항 사용, 없으면 원본 사용)
                const currentStatus = statusChanges[employee.id] || employee.status;

                return (
                  <tr>
                    <td className={tableCellClasses}>{employee.name}</td>
                    <td className={tableCellClasses}>{employee.department}</td>
                    <td className={tableCellClasses}>{employee.position}</td>
                    <td className={tableCellClasses}>{employee.email}</td>
                    <td className={`${tableCellClasses} w-[200px] border-r-0 text-center`}>
                      <div className="flex justify-center">
                        <Dropdown
                          options={STATUS_OPTIONS}
                          selectedValue={currentStatus}
                          onSelect={(value) =>
                            handleStatusChange(employee.id, value as Employee['status'])
                          }
                          statusType="approval"
                          className="w-full max-w-[120px]"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <button
        onClick={handleSave}
        disabled={!isDirty || isSaving}
        className={`/* 💡 버튼 크기 및 패딩 수정 */ flex h-10 w-[113px] items-center justify-center self-end rounded-[10px] px-[15px] py-[5px] font-semibold text-white transition duration-200 ${
          isDirty && !isSaving
            ? 'bg-mainColor-blue600 hover:bg-mainColor-blue700'
            : 'cursor-not-allowed bg-greyColor-grey300'
        } `}
      >
        {isSaving ? '저장 중...' : '저장하기'}
      </button>
    </div>
  );
}
