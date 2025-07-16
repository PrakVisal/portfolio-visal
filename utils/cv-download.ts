import { toast } from '@/hooks/use-toast'

export async function downloadCV() {
  try {
    const response = await fetch('/api/download-cv')
    if (response.ok) {
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Aqsam_CV.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: 'Success!',
        description: 'CV downloaded successfully!',
      })
    } else {
      throw new Error('Failed to download CV')
    }
  } catch (error) {
    toast({
      title: 'Error',
      description: 'Failed to download CV. Please check your connection.',
      variant: 'destructive',
    })
  }
}
