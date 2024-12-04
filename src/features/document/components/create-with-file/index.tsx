'use client'

import TitleInput from '@/features/modify/components/title-input'
import { EditDocumentProvider } from '@/features/modify/context/edit-document-context'
import CreateQuizDrawer from '@/features/write/components/create-quiz-drawer'
import FixedBottom from '@/shared/components/custom/fixed-bottom'
import Icon from '@/shared/components/custom/icon'
import Text from '@/shared/components/ui/text'

const CreateWithFile = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCreateDocument = (params: { quizType: Quiz.Type; star: number }) => {}

  return (
    <EditDocumentProvider>
      <TitleInput />
      {/* write의 editor로 변경해야함 */}

      {/* 파일 첨부 영역 : 첨부된 파일이 없을 때 노출 */}
      <div className="flex-center h-[calc(100dvh-131.6px-188px)] flex-col">
        <input type="file" name="file" id="file" className="hidden" />
        <label
          htmlFor="file"
          className="flex-center mb-[16px] h-[94px] w-[246px] cursor-pointer rounded-[16px] border-2 border-dashed border-border-default"
        >
          <Icon name="plus-circle" className="mr-[12px] size-[24px]" />
          <Text typography="subtitle2-bold" className="text-text-secondary">
            파일 추가하기
          </Text>
        </label>
        <Text typography="text1-medium" className="text-text-sub">
          txt, docx 포맷, 3MB 이상 12MB 미만 파일 업로드
        </Text>
      </div>

      {/* 첨부한 파일이 있으면 파일 정보 렌더링 : 파일 이름, 용량, 글자 수*/}
      {/* <div className="sticky top-[54px] z-10 flex items-center justify-between bg-background-base-02 px-[16px] py-[11px]">
            <div className="flex items-center">
              <Icon name="info" className="mr-[4px] size-[16px]" />
              <Text as="span" typography="text2-medium" className="mr-[4px] text-text-secondary">
                파일이름.docx
              </Text>
              <Text as="span" typography="text2-medium" className="text-text-caption">
                {`(11MB, 1372자)`}
              </Text>
            </div>
            <button className="text-text1-medium text-button-text-tertiary">
              <Text typography="text1-medium" className="text-text-secondary">
                변경
              </Text>
            </button>
          </div> */}

      {/* 파일 내용 텍스트 */}
      {/* <div className="px-[20px] pb-[132px] pt-[20px]">
            {
              '국내시장 동향 국내의 식물기반 단백질 시장은 중소기업의 채식주의자 대상 상품군이 시장을 주도하고 있었으나, 최근 대기업의 참여가 시작되고 있는 상황이며, 패티, 미트볼, 소지지, 돈가스 등의 기존 육가공품 형태로 판매하고 있다. 현재 우리나라의 식물기반 단백질의 시장규모는 2018년 기준 7천10만 달러(약 771억 원)으로 글로벌 컨설팅회사에서 추정하고 있으며, 이중 버거패티와 미트볼, 너겟류 형태 제품의 점유율이 66.8%로 추정된다. 시장 전망과 대응방안 우리나라에서 육류를 소비하는 주요 조리 방법은 육류 본연의 맛을 최대한 활용하는 구이를 통한 섭취 방식이며, 현재 식물기반 단백질은 육류보다 떨어지는 식미감으로 햄버거 패티나 치킨너겟 등에 한정되어 사용되며 구이 방식으로 섭취하기에는 한계가 있으므로 단시간에 일반 육류와 같은 지위에 오르기에는 한계가 있었다. 그러나 식물기반 단백질은 압출성형 기술이 적용된 조직화 식물단백을 주원료로 사용하며, 조미과정을 거쳐 다양한 첨가물을 추가하여 생산되는 가공식품이란 점에 주의할 필요가 있다. 이는 자연식품인 육류와 차별되는 점이며, 소비자에게 육류의 안전성을 강조 및 인식시킬 필요가 있다. 또한 식물기반 단백질에 대한 적절한 용어의 선택이 필요한 시점이다. 식물기반 단백질은 영양성분 및 식미감의 차이로 기존 육류의 대체재가 아닌 보완재의 역할이 요구되나, 제품명에 ‘고기’라는 용어를 사용할 경우 소비자에게 육류를 대체할 수 있다는 오해를 줄 수 있으므로 적절한 용어를 먼저 제시하여 시장 이슈를 선점할 필요가 있다. 배양육 배양육은 살아있는 동물의 세포를 채취한 뒤 세포공학 기술로 증식하여 얻게 되는 식용고기를 의미하며, 가축을 사육하는 과정을 거치지 않고 고기를 얻는 기술이다. 배양육 관련업체는 배양육 생산과정에서 인체에 해로운 포화지방산을 오메가3 같은 유익한 지방산으로 대체하는 것이 가능하며, 배지와 배양조건을 조절하여 건강에 유익한 육류를 선별하여 생산할 수 있는 장점이 있다. 또한 가축전염병의 인체감염 우려, 축산물 생산과정에서 발생하는 분뇨, 오·폐수, 메탄가스 발생 등을 감소시킬 수 있다고 홍보하고 있다. 해외시장 동향 현재 대량생산되어 본격적으로 상품화된 배양육 제품은 찾기 힘든 상황이지만, 컨설팅업계는 배양육이 본격적으로 시장을 형성하는 시기를 2025년으로 예상하고 있다. 또한 2022년 11월 미국의 업사이드푸드는 닭고기 배양육의 식품안전성에 대해서 FDA의 승인을 받았다고 발표하는 등 배양육의 상품화가 가시권내로 들어오고 있는 상황이다. 향후 배양육 시장 규모는 2025년 2억 1천400만 달러에서 2032년 5억9천290만 달러로 연평균 15.7% 성장할 것으로 전망되고 있다. 국내시장 동향 있어서 무시할 수 없는 소비계층이라는 평가를 받고 있다. 이들은 환경보호, 인권 뿐만 아니라 동물의 권리인 동물권에까지 관심이 높다.'
            }
          </div> */}

      <FixedBottom className="px-[20px]">
        {/* TODO: file로 문서 생성하는 로직 필요 */}
        <CreateQuizDrawer handleCreateDocument={handleCreateDocument} />
      </FixedBottom>
    </EditDocumentProvider>
  )
}

export default CreateWithFile
