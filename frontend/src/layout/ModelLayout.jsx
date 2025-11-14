import { FiX } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function ModalLayout({ children }) {
    const { setModal } = useContext(AuthContext);
    
    async function clicked(e) {
        if (e.target === e.currentTarget) {
            setModal(false)
        }
    }

    return (
        <div
            onClick={clicked}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end md:items-center z-40"
        >
            <div
                className="w-full max-w-[500px] mx-auto bg-gray-800 rounded-md shadow-2xl max-h-[90%] overflow-y-auto"
            >
                <div className="p-3">
                    <div className="flex justify-end items-center">
                        <button
                            onClick={()=>setModal(false)}
                            className="text-white transition"
                        >
                            <FiX size={20} />
                        </button>
                    </div>
                </div>
                <div className="px-7 py-5">{children}</div>
            </div>
        </div >
    );
};