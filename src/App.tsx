import { AgencyHomePage } from '@/components/agency-home-page'
import { useQuery } from '@tanstack/react-query'

type Agency = {
  id: string
  slug: string
  name: string
}

// actual API request
const fetchAgency = async (agencySlug: string): Promise<Agency> => {
  const response = await fetch(`/api/agencies/${agencySlug}`)

  if (!response.ok) {
    throw new Error()
  }

  return response.json()
}

const useGetAgency = (agencySlug: string) => {
  return useQuery({
    queryKey: ['agency', agencySlug],
    queryFn: () => fetchAgency(agencySlug),
    enabled: !!agencySlug
  })
}

function App() {
  const agencySlug =
    window.location.pathname.split('/').filter(Boolean)[0] ?? ''

  const { data: agency, isPending, isError, error } = useGetAgency(agencySlug)

  if (!agencySlug) {
    return <main>Enter an agency slug in the URL.</main>
  }

  if (isPending) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error: {error.message}</p>
  }

  return <AgencyHomePage agency={agency} />
}

export default App
