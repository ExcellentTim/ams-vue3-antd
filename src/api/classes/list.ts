import request from '@/utils/request';

// 获取课程列表
export function getClassesList() {
  return Promise.resolve({
    results: [
      {
        id: 1,
        class_name: '2022秋季一班',
        count: 12,
        status: 1,
        headmaster: '17665899876（小鱼儿老师）',
        teacher: '1',
        create_time: '2022-10-18 14:33:19'
      },
      {
        id: 2,
        class_name: '2022秋季一班',
        count: 12,
        status: 2,
        headmaster: '17665899876（小鱼儿老师）',
        teacher: '1',
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
export function getClassesDetail(id) {
  return Promise.resolve({
    data: {
      id: 2,
      name: '秋季一班test',
      status: 1,
      headmaster: '15345677654（张老师test）',
      teacher: [
        {
          id: 1,
          name: ' 17665899876（小鱼儿老师1)'
        },
        {
          id: 2,
          name: ' 17665899876（小鱼儿老师2)'
        }
      ],
      student: [
        {
          id: 3,
          name: ' 15345677654（世界上最最最优秀的编程家的编程家二十个字）'
        },
        {
          id: 4,
          name: ' 15345677654（世界上最最最优秀的编程家的编程家二十个字）'
        },
        {
          id: 5,
          name: ' 17665899876（小鱼儿老师3)'
        },
        {
          id: 6,
          name: ' 17665899876（小鱼儿老师4)'
        },
        {
          id: 7,
          name: ' 15345677654（上最最最优秀的编程家1个字）)'
        },
        {
          id: 8,
          name: ' 15345677654（世界上最最最优秀的身份的编程家1个字）)'
        },
        {
          id: 9,
          name: ' 15345677654（世界上最最最优秀的111二十个字）)'
        },
        {
          id: 10,
          name: ' 17665899876（小鱼儿的老师4)'
        },
        {
          id: 11,
          name: ' 17665899876（小鱼儿老师3)'
        },
        {
          id: 12,
          name: ' 17665899876（小鱼儿老师4)'
        },
        {
          id: 13,
          name: ' 17665899876（小鱼儿老师3)'
        },
        {
          id: 14,
          name: ' 17665899876（小鱼儿老师4)'
        },
        {
          id: 15,
          name: ' 17665899876（小鱼儿打算老师3)'
        },
        {
          id: 16,
          name: ' 17665899876（小鱼撒打算的儿老师4)'
        },
        {
          id: 17,
          name: ' 17665899876（小鱼儿老师3)'
        },
        {
          id: 18,
          name: ' 17665899876（小鱼儿辅导书辅导书老师4)'
        },
        {
          id: 19,
          name: ' 17665899876（小鱼儿老师3)'
        },
        {
          id: 20,
          name: ' 17665899876（小鱼大师大师大师似懂非懂舒服儿老师4)'
        }
      ]
    }
  });
  // return request({
  //   url: `/api/v1/aimofa/`,
  //   method: 'get'
  // });
}
