"use client"
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Input from "@/components/Input/Input";
import { orderSchema } from "@/schema/schemas";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

let copy = []
const Checkout = () => {
  const delivery = 10
  const [loader, setLoader] = useState(false)
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(0)
  const [error, setError] = useState("")
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    contact: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    instructions: "",
  });
  const [quantity, setQuantity] = useState(1)
  const fetchProducts = async () => {
    console.log("fetch products");
    const session = await getSession()
    const res2 = await fetch(`/api/cart?userId=${session?.user?.id}`)
    let result = await res2.json()
    result = result.map((item) => {
      return { ...item, quantity: 1 }
    })
    copy = result
    console.log(result);
    setProducts(result)
    let tempPrice = 0
    for (let i = 0; i < result.length; i++) {
      tempPrice += result[i]?.price
    }
    setPrice(tempPrice)
  }
  useEffect(() => {
    fetchProducts()
  }, []);

  const onChangeHandler = (e) => {
    setError("")
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const plus = (id) => {
    let temp = []
    temp = products.map((item, i) => {
      if (item.id === id) {
        setPrice(price + copy[i].price)
        return {
          ...item,
          price: item.price + copy[i].price,
          quantity: item.quantity + 1,
        };
      }
      return item
    })
    setProducts(temp)
  }
  const minus = (id) => {
    let temp = []
    temp = products.map((item, i) => {
      if (item.id === id) {
        console.log(copy, "this is the log");
        if (!(item.quantity === 1)) {
          
          setPrice(price - copy[i].price)
          return {
            ...item,
            price: item.price - copy[i].price,
            quantity: item.quantity - 1,
          };
        }
      }
      return item
    })
    setProducts(temp)
  }

  const onClickHandler = async () => {
    setLoader(true)
    const session = await getSession()
    const productsObj = products.map((item) => {
      return { id: item.id, quantity: item.quantity }
    })
    orderSchema.validate(form, { abortEarly: false })
    .then((res) => {
        const order = async () => {

          const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId: session?.user?.id,
              amount: price + delivery,
              orderDetails: { ...form },
              products: productsObj
            }),
          });
          const result = await response.json()
          if (result.message === "success") {
            const response = await fetch('/api/cart', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                userId: session?.user?.id,
                products: "all"
              }),
            });
            setLoader(false)
            toast.success('Order placed', {
              position: "top-right",
              autoClose: 5000, // Closes after 5 seconds
            });
            router.push("/")
          }
          setForm({
            name: "",
            contact: "",
            address: "",
            city: "",
            province: "",
            postalCode: "",
            instructions: "",
          })
        }
        order()
      })
      .catch((err) => {
        setLoader(false)
        setError(err.errors[0])
      })
  }

  return (
    <div className="flex flex-col w-full justify-center items-center px-10 mobile:px-0 mb-20">
      <h1 className="text-5xl font-bold mt-28">Checkout</h1>
      <div className="bg-gray-50 flex w-full mt-10 tablet:flex-col mobile:flex-col">
        <div className="bg-white px-6 rounded-md w-[60%] laptop:w-[50%] tablet:w-full mobile:w-full">
          <h1 className="text-4xl font-semibold mb-5">Delivery Details</h1>
          <div className="flex flex-col gap-y-2">
            <h2 className="text-2xl font-semibold mb-3">Your Information</h2>
            <div className="flex gap-x-4">
              <Input name="name" placeholder="Name" value={form.name} func={onChangeHandler} />
              <Input name="contact" placeholder="Phone Number" value={form.contact} func={onChangeHandler} />
            </div>
          </div>
          <div className="flex flex-col gap-y-2 mt-5">
            <h2 className="text-2xl font-semibold mb-3">Shipping Details</h2>
            <div className="flex gap-x-4">
              <Input name="address" placeholder="Address" value={form.address} func={onChangeHandler} />
            </div>
            <div className="flex gap-x-4">
              <Input name="city" placeholder="City" value={form.city} func={onChangeHandler} />
              <Input name="province" placeholder="Province" value={form.province} func={onChangeHandler} />
            </div>
            <div className="flex gap-x-4">
              <Input name="postalCode" placeholder="Postal Code" value={form.postalCode} func={onChangeHandler} />
            </div>
          </div>
          <div className="flex flex-col gap-y-2 mt-5">
            <h2 className="text-2xl font-semibold mb-3">Description</h2>
            <div className="flex gap-x-4">
              <Input name="instructions" placeholder="Instructions (optional)" value={form.instructions} func={onChangeHandler} />
            </div>
          </div>
        </div>
        {/* Product Listing */}
        <div className="bg-white px-6 rounded-md w-[40%] laptop:w-[50%] tablet:w-full mobile:w-full mobile:mt-10 tablet:mt-10">
          <h2 className="text-4xl font-semibold mb-8">Order Summary</h2>
          <div className="space-y-4 h-[335px] overflow-y-scroll">
            {products.map((product, i) => (
              <div key={product.id} className="flex items-center">
                <div className="flex w-[80%] gap-x-2 tablet:w-[90%] mobile:w-[90%]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-24 h-24 object-cover mb-4 sm:mb-0 mobile:w-20"
                  />
                  <div className="">
                    <p className="font-semibold">{product.title}</p>
                    <p className="text-gray-800 font-semibold text-lg mobile:text-base">${copy[i]?.price}<span className="font-semibold text-gray-600 text-sm">{" x " + product.quantity + " = "}</span><span className="font-semibold text-gray-950 text-xl mobile:text-lg">${product.price.toFixed(2)}</span></p>
                  </div>
                </div>

                <div className="w-[20%] tablet:w-[100px] mobile:w-[100px]">
                  <button
                    onClick={() => minus(product.id)}
                    className="px-[10px] py-[5px] text-base cursor-pointer border border-gray-300 bg-gray-200"
                  >
                    -
                  </button>
                  <span className="ml-1 mr-1 text-lg font-semibold">{products[i]?.quantity}</span>
                  <button
                    onClick={() => plus(product.id)}
                    className="px-[10px] py-[5px] text-base cursor-pointer border border-gray-300 bg-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full h-[1px] bg-black mt-5 mb-2"></div>
          <div className="text-lg flex flex-col gap-y-1">
            <div className="flex w-full">
              <p className="w-[80%]">Sub-Total:</p>
              <p className="w-[20%]">${price.toFixed(2)}</p>
            </div>
            <div className="flex w-full justify-between">
              <p className="w-[80%]">Delivery Charges:</p>
              <p className="w-[20%]">$10</p>
            </div>
            <div className="flex w-full justify-between font-bold text-xl mt-2">
              <p className="w-[80%]">Total:</p>
              <p className="w-[20%]">${(price + delivery).toFixed(2)}</p>
            </div>
          </div>
            <h3 className="text-red-500 text-lg mt-1">{error}</h3>
          <button onClick={onClickHandler} className='bg-black text-white px-4 py-3 w-full rounded-sm duration-300 hover:scale-[1.02] mt-2'>
            {loader ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
