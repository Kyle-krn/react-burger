import { useNavigate, useParams } from "react-router-dom";
import Modal from "../modal";
import FeedDetails from "../feed-details";

const FeedModal = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    return (
        <Modal onClose={() => navigate(-1)} title={`#${id}`} extraClassName='text_type_digits-default'>
            <FeedDetails />
        </Modal>
    )
}

export default FeedModal;