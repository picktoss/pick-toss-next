'use client'

import { createContext, PropsWithChildren, useContext, useEffect, useMemo } from 'react'
import { init, track } from '@amplitude/analytics-browser'
import { usePathname } from 'next/navigation'
import { CATEGORIES } from '@/features/category/config'

/**
 * Amplitude API Key
 */
const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY || ''

/* -------------------------------------------------------------------------- */
/*                           [이벤트별 Props 정의]                             */
/* -------------------------------------------------------------------------- */

/** [온보딩] account_create */
export interface AccountCreateProps {
  type: '구글' | '카카오'
}

/** [홈] randomquiz_change */
export interface RandomquizChangeClickProps {
  /** '퀴즈노트', '컬렉션' */
  option: '퀴즈노트' | '컬렉션'
}

/** [홈] top5_note_click */
export interface Top5NoteClickProps {
  /** 1,2,3,4,5 (클릭한 노트의 순위) */
  rank: number
}

/** [퀴즈노트] note_add_click */
export interface NoteAddClickProps {
  /** '작성', '파일' (노트 추가 방식) */
  method: '작성' | '파일'
}

/** [퀴즈노트] quiz_create */
export interface QuizCreateProps {
  type: '객관식' | 'OX'
}

/** [퀴즈노트] quiz_replay */
export interface QuizReplayProps {
  type: '전체' | '객관식' | 'OX'
}

/** [퀴즈노트] answer_view_change */
export interface AnswerViewChangeProps {
  /** True, False (정답 보기 토글 여부) */
  status: boolean
}

/** [컬렉션] collection_add_click */
export interface CollectionAddClickProps {
  option: '헤더' | '내 컬렉션'
}

/** [컬렉션] collection_create */
export interface CollectionCreateClickProps {
  /** 'IT·프로그래밍', '경영·경제' 등 */
  category: (typeof CATEGORIES)[number]['name']
}

/** [컬렉션] collection_item_click */
export interface CollectionItemClickProps {
  type: '만든 컬렉션' | '보관한 컬렉션' | '탐색'
}

/** [컬렉션] filter_category_apply */
export interface FilterCategoryApplyProps {
  /** 'IT·프로그래밍', '경영·경제', '과학·공학' 등 */
  category: (typeof CATEGORIES)[number]['name']
}

/** [컬렉션] filter_quiztype_apply */
export interface FilterQuiztypeApplyProps {
  type: '객관식' | 'OX'
}

/** [컬렉션] collection_sort_change */
export interface CollectionSortChangeProps {
  option: '인기' | '최신'
}

/** [퀴즈] quiz_start, quiz_complete, quiz_exit */
export interface QuizStartClickProps {
  type: '오늘의 퀴즈' | '퀴즈노트' | '컬렉션'
  /** 1~24 (오늘의 퀴즈 시작 시간대) */
  time?: number
}

/** [마이] quickmenu_click */
export interface QuickmenuClickProps {
  option: '내 컬렉션' | '퀴즈 분석' | '퀴즈 기록'
}

/** [PRO 구독] purchase_click, purchase_complete */
export interface PurchaseClickProps {
  /** 결제 금액 */
  price: number
}
export interface PurchaseCompleteProps {
  /** 결제 금액 */
  price: number
}

/** [친구 초대] share_click */
export interface ShareClickProps {
  method: '복사' | '카카오톡' | '일반 공유'
}

/* -------------------------------------------------------------------------- */
/*                   [AmplitudeContext에서 제공할 메서드 목록]                 */
/* -------------------------------------------------------------------------- */

export interface Values {
  /**
   * (공통) 임의 이벤트 트래킹용 메서드
   */
  trackAmplitudeEvent: <T extends Record<string, unknown>>(
    eventName: string,
    eventProperties?: T
  ) => void

  /* -------------------------- [온보딩] -------------------------- */
  // accountCreateEvent: (props: AccountCreateProps) => void
  onboardStartEvent: () => void
  onboardInterestSaveEvent: () => void

  /* -------------------------- [홈] -------------------------- */
  analysisClickEvent: () => void
  historyClickEvent: () => void
  bombquizClickEvent: () => void
  bombquizCloseEvent: () => void
  randomquizClickEvent: () => void
  randomquizChangeClickEvent: (props: RandomquizChangeClickProps) => void
  randomquizCloseClickEvent: () => void
  top5NoteClickEvent: (props: Top5NoteClickProps) => void
  interestItemClickEvent: () => void
  interestItemMoreClickEvent: () => void

  /* -------------------------- [퀴즈노트] -------------------------- */
  noteClickEvent: () => void
  noteAddClickEvent: (props: NoteAddClickProps) => void
  noteViewEvent: () => void
  noteCloseEvent: () => void
  noteEditEvent: () => void
  quizCreateEvent: (props: QuizCreateProps) => void
  quizReplayEvent: (props: QuizReplayProps) => void
  reviewClickEvent: () => void
  quizTabClickEvent: () => void
  noteTabClickEvent: () => void
  answerViewChangeEvent: (props: AnswerViewChangeProps) => void
  addToCollectionClickEvent: () => void

  /* -------------------------- [컬렉션] -------------------------- */
  collectionAddClickEvent: (props: CollectionAddClickProps) => void
  collectionCreateClickEvent: (props: CollectionCreateClickProps) => void
  collectionItemClickEvent: (props: CollectionItemClickProps) => void
  // filterCategoryApplyEvent: (props: FilterCategoryApplyProps) => void
  // filterQuiztypeApplyEvent: (props: FilterQuiztypeApplyProps) => void
  collectionSortChangeEvent: (props: CollectionSortChangeProps) => void

  /* -------------------------- [퀴즈] -------------------------- */
  quizStartClickEvent: (props: QuizStartClickProps) => void
  quizCompleteViewEvent: () => void
  quizExitClickEvent: () => void

  /* -------------------------- [마이] -------------------------- */
  quickmenuClickEvent: (props: QuickmenuClickProps) => void
  interestSaveEvent: () => void

  /* -------------------------- [PRO 구독] -------------------------- */
  proPurchaseViewEvent: () => void
  purchaseClickEvent: (props: PurchaseClickProps) => void
  purchaseCompleteEvent: (props: PurchaseCompleteProps) => void

  /* -------------------------- [친구 초대] -------------------------- */
  inviteViewEvent: () => void
  shareClickEvent: (props: ShareClickProps) => void
}

/* -------------------------------------------------------------------------- */
/*                        [Context & Provider 구현]                           */
/* -------------------------------------------------------------------------- */

export const AmplitudeContext = createContext<Values | null>(null)

export const AmplitudeContextProvider = ({ children }: PropsWithChildren) => {
  const pathname = usePathname()

  useEffect(() => {
    // production 환경에서만 Amplitude 초기화
    if (process.env.NODE_ENV === 'production') {
      init(AMPLITUDE_API_KEY, undefined, {
        defaultTracking: {
          sessions: true,
        },
      })
    }
  }, [])

  /**
   * 공통 트래킹 함수
   */
  const trackAmplitudeEvent = <T extends Record<string, unknown>>(
    eventName: string,
    eventProperties?: T
  ) => {
    track(eventName, eventProperties)
  }

  /**
   * 주어진 이벤트 표에 따라 메서드 구현
   */
  const value = useMemo<Values>(
    () => ({
      trackAmplitudeEvent,

      /* ---------------------- [온보딩] ---------------------- */
      // accountCreateEvent: (props) => trackAmplitudeEvent('account_create', { ...props, pathname }),
      onboardStartEvent: () => trackAmplitudeEvent('onboard_start', { pathname }),
      onboardInterestSaveEvent: () => trackAmplitudeEvent('onboard_interest_save', { pathname }),

      /* ---------------------- [홈] ---------------------- */
      analysisClickEvent: () => trackAmplitudeEvent('analysis_click', { pathname }),
      historyClickEvent: () => trackAmplitudeEvent('history_click', { pathname }),
      bombquizClickEvent: () => trackAmplitudeEvent('bombquiz_start', { pathname }),
      bombquizCloseEvent: () => trackAmplitudeEvent('bombquiz_exit', { pathname }),
      randomquizClickEvent: () => trackAmplitudeEvent('randomquiz_start', { pathname }),
      randomquizChangeClickEvent: (props) =>
        trackAmplitudeEvent('randomquiz_change', { ...props, pathname }),
      randomquizCloseClickEvent: () => trackAmplitudeEvent('randomquiz_exit', { pathname }),
      top5NoteClickEvent: (props) => trackAmplitudeEvent('top5_note_click', { ...props, pathname }),
      interestItemClickEvent: () => trackAmplitudeEvent('interest_item_click', { pathname }),
      interestItemMoreClickEvent: () =>
        trackAmplitudeEvent('interest_item_more_click', { pathname }),

      /* ---------------------- [퀴즈노트] ---------------------- */
      noteClickEvent: () => trackAmplitudeEvent('note_click', { pathname }),
      noteAddClickEvent: (props) => trackAmplitudeEvent('note_add_click', { ...props, pathname }),
      noteViewEvent: () => trackAmplitudeEvent('note_view', { pathname }),
      noteCloseEvent: () => trackAmplitudeEvent('note_close', { pathname }),
      noteEditEvent: () => trackAmplitudeEvent('note_edit', { pathname }),
      quizCreateEvent: (props) => trackAmplitudeEvent('quiz_create', { ...props, pathname }),
      quizReplayEvent: (props) => trackAmplitudeEvent('quiz_replay', { ...props, pathname }),
      reviewClickEvent: () => trackAmplitudeEvent('review_click', { pathname }),
      quizTabClickEvent: () => trackAmplitudeEvent('quiz_tab_click', { pathname }),
      noteTabClickEvent: () => trackAmplitudeEvent('note_tab_click', { pathname }),
      answerViewChangeEvent: (props) =>
        trackAmplitudeEvent('answer_view_change', { ...props, pathname }),
      addToCollectionClickEvent: () => trackAmplitudeEvent('add_to_collection_click', { pathname }),

      /* ---------------------- [컬렉션] ---------------------- */
      collectionAddClickEvent: (props) =>
        trackAmplitudeEvent('collection_add_click', { ...props, pathname }),
      collectionCreateClickEvent: (props) =>
        trackAmplitudeEvent('collection_create', { ...props, pathname }),
      collectionItemClickEvent: (props) =>
        trackAmplitudeEvent('collection_item_click', { ...props, pathname }),
      // filterCategoryApplyEvent: (props) =>
      //   trackAmplitudeEvent('filter_category_apply', { ...props, pathname }),
      // filterQuiztypeApplyEvent: (props) =>
      //   trackAmplitudeEvent('filter_quiztype_apply', { ...props, pathname }),
      collectionSortChangeEvent: (props) =>
        trackAmplitudeEvent('collection_sort_change', { ...props, pathname }),

      /* ---------------------- [퀴즈] ---------------------- */
      quizStartClickEvent: (props) => trackAmplitudeEvent('quiz_start', { ...props, pathname }),
      quizCompleteViewEvent: () => trackAmplitudeEvent('quiz_complete', { pathname }),
      quizExitClickEvent: () => trackAmplitudeEvent('quiz_exit', { pathname }),

      /* ---------------------- [마이] ---------------------- */
      quickmenuClickEvent: (props) =>
        trackAmplitudeEvent('quickmenu_click', { ...props, pathname }),
      interestSaveEvent: () => trackAmplitudeEvent('interest_save', { pathname }),

      /* ---------------------- [PRO 구독] ---------------------- */
      proPurchaseViewEvent: () => trackAmplitudeEvent('pro_purchase_view', { pathname }),
      purchaseClickEvent: (props) => trackAmplitudeEvent('purchase_click', { ...props, pathname }),
      purchaseCompleteEvent: (props) =>
        trackAmplitudeEvent('purchase_complete', { ...props, pathname }),

      /* ---------------------- [친구 초대] ---------------------- */
      inviteViewEvent: () => trackAmplitudeEvent('invite_view', { pathname }),
      shareClickEvent: (props) => trackAmplitudeEvent('share_click', { ...props, pathname }),
    }),
    [pathname]
  )

  return <AmplitudeContext.Provider value={value}>{children}</AmplitudeContext.Provider>
}

/**
 * AmplitudeContext 사용을 위한 커스텀 훅
 */
export const useAmplitudeContext = () => {
  const context = useContext(AmplitudeContext)
  if (context == null) {
    throw new Error('useAmplitudeContext must be used within an AmplitudeContextProvider')
  }
  return context
}
