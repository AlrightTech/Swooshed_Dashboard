
function EventsDisplay() {
  return (
    <div className="flex bg-white shadow-md rounded-lg overflow-hidden max-w-2xl bg-cyan-500">
      <div className="w-1/1">
        <img className="object-cover h-full my-5" src="https://images.unsplash.com/photo-1648073380884-89a32b950b8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="Event" />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2 mt-5">Memorial Day</h2>
        <p className="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid consequuntur cumque, rerum aperiam
         reprehenderit nihil natus, eveniet corrupti voluptates asperiores non accusantium aspernatur fuga explicabo!</p>
      </div>
    </div>
  )
}

export default EventsDisplay
