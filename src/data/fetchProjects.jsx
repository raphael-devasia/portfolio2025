import { createClient } from "contentful"
import { useEffect, useState } from "react"


console.log("the key is ", process.env.REACT_APP_API_KEY)


const client = createClient({
    space: "5a2ne9pfakv6",
    environment: "master", // defaults to 'master' if not set
    accessToken: process.env.REACT_APP_API_KEY,
})

export const useFetchProject = () => {
    const [loading, setLoading] = useState(true)
    const [projects, setProjects] = useState([])

    const getData = async () => {
        try {
            const response = await client.getEntries({
                content_type: "projects",
            })
            const projects = response.items.map((item) => {

               const { title, url, image, description, source,date,tags,category } = item.fields
                
                
                const id = item.sys.id
                const img = image?.fields?.file?.url
                const shortDescription =
                    description?.length > 300
                        ? `${description.slice(0, 300)}...`
                        : description

                return {
                    title,
                    webapp:url,
                    id,
                    image: img,
                    description: shortDescription,
                    github:source,
                    date,
                    tags,category
                }
            })
            setProjects(projects)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return { loading, projects }
}
