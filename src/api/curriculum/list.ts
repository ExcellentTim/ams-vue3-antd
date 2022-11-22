import request from '@/utils/request';

// 获取课程列表
export function getCurriculumList() {
  return Promise.resolve({
    results: [
      {
        id: 1,
        curriculum_name: '胡彦斌',
        status: 32,
        live_time: '2022-10-18 14:00~2022-10-18 15:00',
        live_teacher: '123',
        classes: '123',
        headmaster: '123',
        create_time: '2022-10-18 14:33:19'
      },
      {
        id: 2,
        curriculum_name: '胡彦斌',
        status: 32,
        live_time: '2022-10-18 14:00~2022-10-18 15:00',
        live_teacher: '123',
        classes: '123',
        headmaster: '123',
        create_time: '2022-10-18 14:33:19'
      }
    ],
    count: 2
  });
  // return request({
  //   url: `/api/v1/aimofa/`,
  //   method: 'get'
  // });
}

// 获取课程详情
export function getCurriculumDetail(id) {
  return Promise.resolve({
    data: {
      id: 2,
      curriculum_name: '图形化编程第五课图形化编程第五课二十个字',
      star_time: '2022-10-18 14:00',
      end_time: '2022-10-18 15:00',
      classes: '2022秋季一班秋季一班2022秋季一班',
      teacher: '1766589987'
    }
  });
  // return request({
  //   url: `/api/v1/aimofa/`,
  //   method: 'get'
  // });
}
