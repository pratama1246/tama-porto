import { lazy, Suspense } from 'react'

const PickupOrderDetail = lazy(() => import('./project-detail/PickupOrderDetail'))
const TicketlyDetail = lazy(() => import('./project-detail/TicketlyDetail'))
const PayrollDetail = lazy(() => import('./project-detail/PayrollDetail'))
const AlproStackQueueDetail = lazy(() => import('./project-detail/AlproStackQueueDetail'))
const GreatestWallpaperDetail = lazy(() => import('./project-detail/GreatestWallpaperDetail'))
const ExploreCentralJavaDetail = lazy(() => import('./project-detail/ExploreCentralJavaDetail'))
const TicketlyMobileDetail = lazy(() => import('./project-detail/TicketlyMobileDetail'))
const AlproPayrollDetail = lazy(() => import('./project-detail/AlproPayrollDetail'))
const JwdBeasiswaDetail = lazy(() => import('./project-detail/JwdBeasiswaDetail'))

export default function ProjectDetail({ project, onBack }) {
  if (!project) return null

  const renderContent = () => {
    switch (project.id) {
      case 1:
        return <PickupOrderDetail project={project} onBack={onBack} />
      case 2:
        return <TicketlyDetail project={project} onBack={onBack} />
      case 3:
        return <PayrollDetail project={project} onBack={onBack} />
      case 4:
        return <AlproStackQueueDetail project={project} onBack={onBack} />
      case 5:
        return <GreatestWallpaperDetail project={project} onBack={onBack} />
      case 6:
        return <ExploreCentralJavaDetail project={project} onBack={onBack} />
      case 7:
        return <TicketlyMobileDetail project={project} onBack={onBack} />
      case 8:
        return <AlproPayrollDetail project={project} onBack={onBack} />
      case 9:
        return <JwdBeasiswaDetail project={project} onBack={onBack} />
      default:
        return (
          <div className="min-h-screen flex items-center justify-center font-handwrite text-lg">
            Project detail not found.
          </div>
        )
    }
  }

  return (
    <Suspense fallback={null}>
      {renderContent()}
    </Suspense>
  )
}
