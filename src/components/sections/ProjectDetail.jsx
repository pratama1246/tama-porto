import PickupOrderDetail from './project-detail/PickupOrderDetail'
import TicketlyDetail from './project-detail/TicketlyDetail'
import PayrollDetail from './project-detail/PayrollDetail'
import AlproStackQueueDetail from './project-detail/AlproStackQueueDetail'
import GreatestWallpaperDetail from './project-detail/GreatestWallpaperDetail'
import ExploreCentralJavaDetail from './project-detail/ExploreCentralJavaDetail'
import TicketlyMobileDetail from './project-detail/TicketlyMobileDetail'

export default function ProjectDetail({ project, onBack }) {
  if (!project) return null

  // Route to the correct project detail component
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
    default:
      return (
        <div className="min-h-screen flex items-center justify-center font-handwrite text-lg">
          Project detail not found.
        </div>
      )
  }
}
