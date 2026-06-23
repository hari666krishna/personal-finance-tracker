function SummaryCard({ title, amount }) {

    return (

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">

            <p className="text-gray-500">

                {title}

            </p>

            <h2 className="text-3xl font-bold mt-3">

                ₹ {amount}

            </h2>

        </div>

    );

}

export default SummaryCard;