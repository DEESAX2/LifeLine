export default function DonorHistoryCard() {
    return (

        <div className="border border-gray-300 ml-4 mr-4 rounded-md w-auto mt-6 p-4 flex flex-col gap-2">

            <div className="flex flex-row items-center gap-4">
                <h1 className="text-xl font-semibold">John Doe</h1>
                <h1 className="bg-red-100 text-red-700 rounded-full w-8 h-5 text-sm flex items-center justify-center">O-</h1>
                <h1 className="bg-green-100 text-green-950 rounded-full w-20 h-5 text-xs flex items-center justify-center">Completed</h1>
            </div>

            <div className= "flex flex-row gap-3">
            <h1 className="text-sm text-gray-700">Age</h1>
            <h1 className="text-sm text-gray-700">johndoe@gmail.com</h1>
            <h1 className="text-sm text-gray-700">0244123456</h1>
            <h1 className="text-sm text-gray-700">2024-12-05</h1>
            </div>

        </div>


    );
}