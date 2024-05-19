import dynamic from 'next/dynamic'

const CreateDocumentForm = dynamic(() => import('./components/create-document-form'), {
  ssr: false,
})

export default function CreateDocument() {
  return (
    <div className="px-[20px]">
      <CreateDocumentForm />
    </div>
  )
}
