
type ReviewProps = {
    customerName?: string,
    customerNumber?: string,
    heading?: string,
    text?: string,
    
}
const Reviews = ({customerName, text, customerNumber, heading }: ReviewProps) => {
  return (
    <div className="my-5 sm:my-10">
        <p className="text-sm font-thin text-black bg-blue-100 border w-fit p-1 px-2 rounded-tr-2xl">{customerNumber}</p>
            <div className="flex flex-wrap justify-center text-black bg-white p-5 w-fit rounded-r-full ">
                <section>
                    <h2 className="uppercase font-bold py-2">{heading}</h2>
                    <p className="text-sm font-thin px-2 py-2">{text}</p>
                    <p className=" bg-blue-100 w-fit py-1 px-2 rounded-lg">{customerName}</p>
                </section>
            </div>
    </div>
  )
}

export default Reviews