import PickupOrderDetail from './project-detail/PickupOrderDetail'
import TicketlyDetail from './project-detail/TicketlyDetail'
import PayrollDetail from './project-detail/PayrollDetail'

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
    default:
      return (
        <div className="min-h-screen flex items-center justify-center font-handwrite text-lg">
          Project detail not found.
        </div>
      )
  }
}
