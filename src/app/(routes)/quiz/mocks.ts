import { QuizDTO } from '@/apis/types/dto/quiz.dto'

export const quizzes: QuizDTO[] = [
  {
    id: 37,
    question: 'OS의 분류 중 Concurrency에 따른 분류가 아닌 것은?',
    answer: '요청된 작업을 일정량씩 모아서 한꺼번에 처리하는 batch processing system',
    explanation:
      "Batch processing system은 OS의 분류에서 '작업을 처리하는 방식'에 해당합니다. Batch processing system은 요청된 작업을 일정량씩 모아서 한꺼번에 처리하고 모인 작업들을 처리할 때 모든 작업이 완전히 종료된 후에 결과를 얻을 수 있으므로, user 입장에서는 response time이 길어진다는 단점이 있습니다.",
    options: [
      '동시 작업(concurrent execution)을 지원하는 OS 방식인 Multi-tasking',
      'CPU와 달리 memory의 경우 여러 프로그램들을 memory에 동시에 올려놓을 수 있는 multi-programming 다중 프로그래밍',
      'Multi-tasking에서 여러 program들이 CPU와 memory를 공유하는 time sharing system',
      '요청된 작업을 일정량씩 모아서 한꺼번에 처리하는 batch processing system',
    ],
    quizType: 'MULTIPLE_CHOICE',
    document: { id: 5, name: 'react' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 26,
    question:
      'key 값은 형제 요소 사이에서만 고유해야 하며, 이는 어떤 문제를 방지하기 위한 것인가요?',
    answer: 'correct',
    explanation:
      'key 값은 형제 요소 사이에서만 고유해야 하며, 이는 key의 변경을 방지하기 위함입니다. key가 고유하지 않으면 React가 요소를 식별하는 데 문제가 발생할 수 있고, 예기치 않은 렌더링 결과를 초래할 수 있습니다.',
    options: [],
    quizType: 'MIX_UP',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 21,
    question: '리액트에서 `key`가 필요한 이유 중 하나는 무엇인가요?',
    answer:
      '컴포넌트의 고유성을 유지하고, 이터러블 객체를 렌더링할 때 각 항목을 식별하기 위함이다.',
    explanation:
      '`key`가 필요한 이유 중 하나는 컴포넌트의 고유성을 유지하고, 이터러블 객체를 렌더링할 때 각 항목을 식별하기 위함입니다. `key`를 통해 리액트는 각 항목을 식별하여 효율적인 업데이트를 수행할 수 있습니다.',
    options: [
      '컴포넌트의 상태를 관리하고, 리렌더링 시에도 이전 상태를 유지하기 위함이다.',
      '컴포넌트의 고유성을 유지하고, 이터러블 객체를 렌더링할 때 각 항목을 식별하기 위함이다.',
      '컴포넌트의 스타일을 지정하고, 렌더링 시에 각 컴포넌트를 구분하기 위함이다.',
      '컴포넌트의 이벤트를 처리하고, 사용자와 상호작용할 때 필요한 역할을 하기 위함이다.',
    ],
    quizType: 'MULTIPLE_CHOICE',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 17,
    question: '리액트에서 `key`의 역할은 무엇인가요?',
    answer: 'correct',
    explanation:
      '`key`는 리액트에서 컴포넌트마다 고유한 메모리를 보유하고, 리렌더링 과정에서 이전 상태나 값을 기억하기 위해 사용됩니다. 이는 컴포넌트의 메모리가 리액트의 내부 인스턴스와 상태 저장 매커니즘에 저장되고, UI 트리에 따라 순차적으로 연결되기 때문에 필요합니다.',
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
    explanation:
      'React에서는 `key` prop을 사용하여 각각의 요소를 고유하게 식별합니다. 만약 `key`를 할당하지 않거나 index 값을 `key`로 사용하면, React는 각 아이템을 올바르게 식별하지 못할 수 있습니다. 예를 들어, 리스트에서 특정 아이템을 삭제하고 다시 추가하면, index 값을 `key`로 사용했을 경우 React는 삭제된 아이템의 키와 새로 추가된 아이템의 키가 같아서 잘못된 업데이트를 할 수 있습니다. 따라서, `key`는 고유하고 변하지 않는 값을 사용해야 하며, index 값을 `key`로 사용하는 것은 안티패턴입니다.',
    options: [],
    quizType: 'MIX_UP',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 22,
    question: 'React에서 key를 사용하는 이유는 무엇인가요?',
    answer: 'correct',
    explanation:
      'React에서 key를 사용하는 이유는 각 컴포넌트를 식별하기 위해서입니다. key를 통해 React는 컴포넌트의 변화를 효율적으로 추적하고 관리할 수 있습니다.',
    options: [],
    quizType: 'MIX_UP',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 29,
    question: 'React에서 key를 사용하는 이유는 무엇인가요?',
    answer: 'incorrect',
    explanation:
      'React에서 key를 사용하는 이유는 동일한 컴포넌트 인스턴스를 식별하고 관리하기 위함입니다. key를 통해 React는 컴포넌트의 변화를 효율적으로 감지하고 업데이트할 수 있습니다.',
    options: [],
    quizType: 'MIX_UP',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 20,
    question: '리액트에서 `key`의 역할은 무엇인가요?',
    answer:
      '컴포넌트의 고유성을 유지하고, 이터러블 객체를 렌더링할 때 각 항목을 식별하는 역할을 한다.',
    explanation:
      '`key`는 리액트에서 컴포넌트의 고유성을 유지하고, 이터러블 객체를 렌더링할 때 각 항목을 식별하는 역할을 합니다. 이를 통해 리액트는 렌더링 과정에서 각 항목을 식별하여 효율적인 업데이트를 수행할 수 있습니다.',
    options: [
      '컴포넌트의 고유성을 유지하고, 이터러블 객체를 렌더링할 때 각 항목을 식별하는 역할을 한다.',
      '컴포넌트의 상태를 관리하고, 리렌더링 시에도 이전 상태를 유지하는 역할을 한다.',
      '컴포넌트의 스타일을 지정하고, 렌더링 시에 각 컴포넌트를 구분하는 역할을 한다.',
      '컴포넌트의 이벤트를 처리하고, 사용자와 상호작용할 때 필요한 역할을 한다.',
    ],
    quizType: 'MULTIPLE_CHOICE',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 23,
    question:
      '`key`를 할당하지 않거나 index 값을 `key`로 사용하는 것은 왜 안티패턴으로 여겨지는 걸까요?',
    answer: 'correct',
    explanation:
      '`key`를 할당하지 않거나 index 값을 `key`로 사용하는 것은 안티패턴으로 여겨지는 이유는 React가 컴포넌트를 식별할 때 효율적이지 못하며, 컴포넌트의 순서가 변경되었을 때 예기치 않은 결과를 초래할 수 있기 때문입니다.',
    options: [],
    quizType: 'MIX_UP',
    document: { id: 4, name: 'React Key' },
    category: { id: 2, name: '자바스크립트' },
  },
  {
    id: 40,
    question:
      'OS(Operating System)의 Interface b/w applications and hardware에서 추상화는 어떤 역할을 하는지 설명해주세요.',
    answer: 'correct',
    explanation:
      'Interface b/w applications and hardware에서 추상화는 하드웨어를 다루는 복잡한 작업을 OS가 대신 처리하여, 사용자 및 프로그램이 하드웨어에 대한 자세한 지식 없이도 프로그램을 실행할 수 있도록 해줍니다. 이를 통해 사용자는 OS가 제공하는 편리한 인터페이스를 통해 하드웨어 자원을 활용할 수 있게 됩니다.',
    options: [],
    quizType: 'MIX_UP',
    document: { id: 5, name: 'react' },
    category: { id: 2, name: '자바스크립트' },
  },
]
