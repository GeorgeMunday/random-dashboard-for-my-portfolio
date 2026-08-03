const Information = () => {
  return (
    // <div className="flex flex-col items-center justify-center gap-4  p-10 font-sans rounded-2xl dark:bg-black mb-10 ">
    //   <h1 className="text-3xl font-bold">Information</h1>
    //   <p className="text-center">
    //     This is a Some random dashboard that i have built to show employers my skills
    //   </p>
    //   <p>and the fact that i can build full-stack applications with modern technologies.</p>
    //   <p>Feel free to explore the dashboard and see what it has to offer.</p>
    //   <p>Thank you for visiting!</p>
    // </div>
    <div className="flex flex-col items-center justify-center gap-4 p-6 font-sans rounded-2xl ">
      <div className="rounded-xl bg-white p-6 shadow dark:bg-neutral-900 w-full">
            <h2 className="text-lg font-semibold text-blue-600">Information</h2>
            <p className="mt-4">
              This is a Some random dashboard that i have built to show employers my skills and the fact that i can build full-stack applications with modern technologies. Feel free to explore the dashboard and see what it has to offer. Thank you for visiting!
            </p>
            <p className="mt-4">
              This dashboard is built with Next.js, Tailwind CSS, and TypeScript. It uses MongoDB as its database. The dashboard is fully responsive and works on all devices.
            </p>
            <h2 className="text-lg font-semibold mt-4 text-blue-600">Features</h2>
            <ul className="list-disc list-inside mt-2">
              <li>Modern UI with Tailwind CSS</li>
              <li>Full-stack functionality with Next.js</li>
              <li>Database integration with MongoDB</li>
              <li>Fully responsive design</li>
              <li>Authentication and authorization</li>
              <li>CRUD operations</li>
            </ul>
      </div>
    </div>
  )
}

export default Information