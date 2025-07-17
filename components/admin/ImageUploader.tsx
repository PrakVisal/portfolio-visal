import { useState } from "react"

interface ImageUploaderProps {
  onUpload?: (url: string) => void
  type?: string // e.g., 'project' or 'pf'
}

export default function ImageUploader({ onUpload, type = 'project' }: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError("")
    }
  }

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setError("")
    const formData = new FormData()
    formData.append("file", file)
    formData.append("type", type)

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()
    setUploading(false)

    if (data.success) {
      setImageUrl(data.data.url)
      onUpload && onUpload(data.data.url)
    } else {
      setError(data.message || "Upload failed")
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleChange} />
      <button type="button" onClick={handleUpload} disabled={uploading || !file} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded">
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: 200, marginTop: 10 }} />
        </div>
      )}
    </div>
  )
} 