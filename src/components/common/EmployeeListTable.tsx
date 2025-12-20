import React, { useState, useEffect, useMemo } from 'react';
import Dropdown from '../common/Dropdown';

interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  permission: '전체' | '관리자' | '재고' | '물류';
}

interface EmployeeListTableProps {
  searchTerm: string;
  isLoading: boolean;
}

const MOCK_EMPLOYEE_LIST: Employee[] = [
  { id: 1, name: '박하은', department: '물류 1팀', position: '인턴', permission: '전체' },
  { id: 2, name: '카피바라', department: '물류 1팀', position: '인턴', permission: '재고' },
  { id: 3, name: '타코', department: '경영지원', position: '매니저', permission: '관리자' },
  { id: 4, name: '박민준', department: '물류 2팀', position: '인턴', permission: '물류' },
  { id: 5, name: '최현우', department: '물류 1팀', position: '인턴', permission: '전체' },
  { id: 6, name: '이지훈', department: '경영지원', position: '대리', permission: '관리자' },
  { id: 7, name: '윤아름', department: '재고 관리', position: '사원', permission: '재고' },
  { id: 8, name: '정우성', department: '물류 2팀', position: '대리', permission: '물류' },
];

const PERMISSION_OPTIONS: Employee['permission'][] = ['전체', '관리자', '재고', '물류'];
const TABLE_WIDTH = '1040px';

export default function EmployeeListTable({
  searchTerm,
  isLoading: parentLoading,
}: EmployeeListTableProps) {
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);

  const [localLoading, setLocalLoading] = useState(true);

  const [permissionChanges, setPermissionChanges] = useState<
    Record<number, Employee['permission']>
  >({});
  const [isSaving, setIsSaving] = useState(false);

  const filteredList = useMemo(() => {
    if (!employeeList.length) return [];
    if (!searchTerm) return employeeList;

    const lowerCaseSearch = searchTerm.toLowerCase();

    return employeeList.filter(
      (employee) =>
        employee.name.toLowerCase().includes(lowerCaseSearch) ||
        employee.department.toLowerCase().includes(lowerCaseSearch) ||
        employee.position.toLowerCase().includes(lowerCaseSearch),
    );
  }, [employeeList, searchTerm]);

  useEffect(() => {
    // 실제 API 호출 로직은 여기에서 구현
    setLocalLoading(true);
    setTimeout(() => {
      setEmployeeList(MOCK_EMPLOYEE_LIST);
      setLocalLoading(false);
    }, 300);
  }, []);

  const handlePermissionChange = (employeeId: number, newPermission: Employee['permission']) => {
    setPermissionChanges((prev) => ({
      ...prev,
      [employeeId]: newPermission,
    }));
  };

  const handleSave = () => {
    if (Object.keys(permissionChanges).length === 0) {
      console.log('변경된 권한 설정이 없습니다.');
      return;
    }

    setIsSaving(true);
    console.log('--- 권한 저장 요청 시작 ---');

    // API 호출 시뮬레이션
    setTimeout(() => {
      // 로컬 상태 업데이트
      setEmployeeList((prevList) =>
        prevList.map((emp) =>
          permissionChanges[emp.id] ? { ...emp, permission: permissionChanges[emp.id] } : emp,
        ),
      );

      // 변경 사항 초기화
      setPermissionChanges({});
      setIsSaving(false);
      console.log('권한 설정이 저장되었습니다.');
      console.log('--- 권한 저장 완료 ---');
    }, 1000);
  };

  const isDirty = Object.keys(permissionChanges).length > 0;

  const tableHeaderClasses =
    'py-3 px-4 font-bold text-sm text-greyColor-grey700 bg-subColor-orange050 border-b border-subColor-orange100 border-r border-greyColor-grey200';

  const tableCellClasses =
    'py-2 px-4 text-sm text-greyColor-grey800 border-b border-greyColor-grey200 border-r border-greyColor-grey200';

  if (localLoading) {
    return <p className="py-10 text-center text-greyColor-grey500">직원 목록을 불러오는 중...</p>;
  }

  return (
    <div className="flex flex-col items-start" style={{ width: TABLE_WIDTH }}>
      <div className="mb-8 w-full overflow-x-auto border border-greyColor-grey200">
        <table className="min-w-full divide-y divide-greyColor-grey200">
          <thead className="bg-subColor-orange050">
            <tr>
              <th className={`${tableHeaderClasses} w-[150px] text-left`}>이름</th>
              <th className={`${tableHeaderClasses} w-[200px] text-left`}>부서</th>
              <th className={`${tableHeaderClasses} w-[150px] text-left`}>직급</th>
              <th className={`${tableHeaderClasses} border-r-0 text-center`}>권한 설정</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-greyColor-grey200 bg-white">
            {filteredList.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className={`${tableCellClasses} border-r-0 text-center text-greyColor-grey500`}
                >
                  등록된 직원 목록이 없습니다.
                </td>
              </tr>
            ) : (
              filteredList.map((employee) => {
                // 현재 설정된 권한 (변경 사항이 있으면 변경 사항 사용, 없으면 원본 사용)
                const currentPermission = permissionChanges[employee.id] || employee.permission;

                return (
                  <tr>
                    <td className={tableCellClasses}>{employee.name}</td>
                    <td className={tableCellClasses}>{employee.department}</td>
                    <td className={tableCellClasses}>{employee.position}</td>
                    <td className={`${tableCellClasses} w-[300px] border-r-0 text-center`}>
                      <div className="flex justify-center">
                        <Dropdown
                          options={PERMISSION_OPTIONS}
                          selectedValue={currentPermission}
                          onSelect={(value) =>
                            handlePermissionChange(employee.id, value as Employee['permission'])
                          }
                          className="w-full max-w-[150px]"
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
