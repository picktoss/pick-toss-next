import { QuizDTO } from '@/apis/types/dto/quiz.dto'

export const quizzes: QuizDTO[] = [
  {
    id: 31,
    question:
      '`key` 값을 할당하지 않거나 index 값을 `key`로 사용하는 것이 왜 안티패턴으로 여겨지는지 설명해주세요.',
    answer: 'correct',
    options: [],
    quizType: 'MIX_UP',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 33,
    question: 'React에서 key 값이 변경되면 어떤 문제가 발생할 수 있을까요?',
    answer:
      'React는 해당 컴포넌트를 완전히 새로운 컴포넌트로 간주하고, 이전 인스턴스를 파괴한 후에 새로운 인스턴스를 생성한다.',
    options: [
      'React는 해당 컴포넌트를 완전히 새로운 컴포넌트로 간주하고, 이전 인스턴스를 파괴한 후에 새로운 인스턴스를 생성한다.',
      'React는 key 값이 변경되어도 컴포넌트를 그대로 유지하며, 변경된 key 값에 따라 컴포넌트를 업데이트한다.',
      'React는 key 값이 변경되면 해당 컴포넌트를 렌더링하지 않고 건너뛰게 된다.',
      'React는 key 값이 변경되면 해당 컴포넌트를 숨기고 새로운 컴포넌트를 보여준다.',
    ],
    quizType: 'MULTIPLE_CHOICE',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 36,
    question:
      '`D`가 추가되었을 때 각각의 컴포넌트의 key 값이 변하지 않아도 되는 이유는 무엇인가요?',
    answer: 'React에서 key 값이 변경되어도 컴포넌트의 내용이 변하지 않기 때문',
    options: [
      'React에서 key 값이 변경되어도 컴포넌트의 순서가 변하지 않기 때문',
      'React에서 key 값이 변경되어도 컴포넌트의 스타일이 변하지 않기 때문',
      'React에서 key 값이 변경되어도 컴포넌트의 상태가 변하지 않기 때문',
      'React에서 key 값이 변경되어도 컴포넌트의 내용이 변하지 않기 때문',
    ],
    quizType: 'MULTIPLE_CHOICE',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 35,
    question: 'React에서 key를 사용하는 이유는 무엇인가요?',
    answer: '가상 DOM과 실제 DOM 간 변경된 부분만 반영하기 위해',
    options: [
      '가상 DOM과 실제 DOM 간 변경된 부분만 반영하기 위해',
      '컴포넌트의 순서를 유지하기 위해',
      '컴포넌트의 스타일을 적용하기 위해',
      '컴포넌트의 상태를 관리하기 위해',
    ],
    quizType: 'MULTIPLE_CHOICE',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 30,
    question:
      '`key` 값이 변경되면 React는 해당 컴포넌트를 완전히 새로운 컴포넌트로 간주하고, 이전 인스턴스를 파괴한 후에 새로운 인스턴스를 생성합니다. 이는 어떤 문제를 발생시킬 수 있나요?',
    answer: 'correct',
    options: [],
    quizType: 'MIX_UP',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 32,
    question:
      '`key` 값을 할당하지 않거나 index 값을 `key`로 사용하는 것이 안티패턴인 이유를 예시와 함께 설명해주세요.',
    answer: 'incorrect',
    options: [],
    quizType: 'MIX_UP',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 29,
    question: 'React에서 key를 사용하는 이유는 무엇인가요?',
    answer: 'incorrect',
    options: [],
    quizType: 'MIX_UP',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 26,
    question:
      'key 값은 형제 요소 사이에서만 고유해야 하며, 이는 어떤 문제를 방지하기 위한 것인가요?',
    answer: 'correct',
    options: [],
    quizType: 'MIX_UP',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 34,
    question:
      'React에서 key가 필요하지 않은 단일 요소에 의도적으로 key를 할당하거나 변경하는 이유는 무엇일까요?',
    answer: '상태를 초기화하기 위해',
    options: [
      '상태를 초기화하기 위해',
      '성능 향상을 위해',
      '컴포넌트의 스타일을 변경하기 위해',
      '컴포넌트의 순서를 변경하기 위해',
    ],
    quizType: 'MULTIPLE_CHOICE',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 25,
    question: 'React에서 key를 사용하는 이유는 무엇인가요?',
    answer: 'incorrect',
    options: [],
    quizType: 'MIX_UP',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
]
