import { useEffect, useState } from "react";
import Image_default from "../../../Assets/Images/Default.png";
import { useProduct } from "../../../context/ProductContext";
import AddProductModal from "../../../components/Modal/AddProductModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import UniversalEditModal from "../../../components/Modal/UniversalEditModal";
import { useUser } from "../../../context/userContext";
import { toast } from "react-toastify";
import { ProductImageEditor } from "../../../Utils/Image/EditImage";
import ManageTagsModal from "../../../components/Modal/ManageTagsModal";
import "../../../Styles/ManageUi.css";
import { useBusiness } from "../../../context/BussinessContext";

// Default product types
const DEFAULT_PRODUCT_TYPES = [
  "raw_material",
  "finished_product",
  "retail_product",
];

const ManageProduct = () => {
  const { product } = useProduct();
  const [productList, setProductList] = useState([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [productTypes, setProductTypes] = useState([]);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalData, setModalData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { businessId } = useParams();
  const { user, token, baseUrl } = useUser();
  const { businesses } = useBusiness();
  const selectedbusiness = businesses.find(
    (b) => String(b.businessId) === businessId
  );

  useEffect(() => {
    if (product && Array.isArray(product)) {
      setProductList(product);
      setProductTypes(
        selectedbusiness?.productCategories || [...DEFAULT_PRODUCT_TYPES]
      );
    }
  }, [product,selectedbusiness?.productCategories]);

  const openAddModal = () => {
    navigate(`/managebusiness/${businessId}/manageproducts/Add_Product`, {
      state: { backgroundLocation: location },
    });
  };

  const openManageModal = () => {
    setModalTitle("Product Types");
    setModalData(productTypes);
    setShowTagsModal(true);
  };

  const handleSaveTags = async (updatedTags) => {
    const type = "product";
    try {
      const res = await fetch(
        `${baseUrl}/v2/bussiness/${user?.id}/tags/${selectedbusiness?._id}/${type}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ tags: updatedTags }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setProductTypes(data.tags || []);
      } else {
        console.error("Failed to update tags", data?.error);
      }
    } catch (err) {
      console.error("Error updating tags", err);
    }
  };

  const { handleImageUpload } = ProductImageEditor({
    userId: user?.id,
    token,
    publicId: editData?.image?.publicId,
    baseUrl,
    businessId,
  });

  const handleImageChange = async (file) => {
    try {
      const result = await handleImageUpload(file);
      if (result) {
        setEditData((prev) => ({
          ...prev,
          image: {
            imageUrl: result.imageUrl,
            publicId: result.publicId,
          },
          imagePreview: result.imageUrl,
        }));
      }
    } catch (err) {
      toast.error(err.message || "Image upload failed");
    }
  };

  const handleEdit = (product) => {
    setEditData({
      ...product,
      imagePreview: product?.image?.imageUrl || Image_default,
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const payload = {
        productName: editData.productName,
        rate: editData.rate,
        productType: editData.productType,
      };

      const res = await fetch(
        `${baseUrl}/v2/bussiness/product/${user?.id}/updateProduct/${businessId}/${editData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Product updated successfully!");
        const updatedList = productList.map((item) =>
          item.productId === editData.productId ? editData : item
        );
        setProductList(updatedList);
        setShowEditModal(false);
      } else {
        toast.error(result.message || "Update failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error during update.");
    }
  };

  const handleDelete = (product) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${product.productName}"?`
      )
    ) {
      const updatedList = productList.filter(
        (item) => item.productId !== product.productId
      );
      setProductList(updatedList);
    }
  };

  return (
    <div className="container rounded shadow-sm py-3">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-2 mb-md-0 me-auto">Manage Products</h4>

        <div className="d-flex flex-wrap align-items-center justify-content-center gap-2">
          <button className="btn btn-sm btn-primary" onClick={openManageModal}>
            <i className="bi bi-pencil-square me-2"></i> Manage Types
          </button>
          <button className="btn btn-sm btn-success" onClick={openAddModal}>
            <i className="bi bi-plus-circle me-2"></i> Add Product
          </button>
        </div>
      </div>

      <hr></hr>

      {productList.length === 0 ? (
        <p className="text-center text-muted">No products found.</p>
      ) : (
        // <div className="row g-4">
        //   {productList.map((prod, index) => (
        //     <div className="col-md-6 col-lg-4" key={index}>
        //       <div
        //         className="card border-0 shadow-sm h-100 position-relative product-card hover-shadow rounded-4"
        //         style={{ backgroundColor: "#51ff0021" }}
        //       >
        //         <div className="position-absolute top-0 end-0 m-2 d-flex gap-2">
        //           <button
        //             className="btn btn-light btn-sm shadow-sm rounded-circle"
        //             title="Edit"
        //             onClick={() => handleEdit(prod)}
        //           >
        //             <i className="bi bi-pencil-fill text-primary"></i>
        //           </button>
        //           <button
        //             className="btn btn-light btn-sm shadow-sm rounded-circle"
        //             title="Delete"
        //             onClick={() => handleDelete(prod)}
        //           >
        //             <i className="bi bi-trash-fill text-danger"></i>
        //           </button>
        //         </div>
        //         <div className="card-body d-flex flex-column align-items-center text-center">
        //           <img
        //             src={prod?.image?.imageUrl || Image_default}
        //             alt={prod?.productName || "Product"}
        //             className="mb-3"
        //             style={{
        //               width: "100px",
        //               height: "100px",
        //               objectFit: "cover",
        //               borderRadius: "15px",
        //               border: "2px solid #eee",
        //             }}
        //           />

        //           <h5 className="fw-semibold mb-1 text-dark">
        //             {prod?.productName}
        //           </h5>
        //           <p className="mb-1">
        //             <span className="badge bg-info-subtle text-dark">
        //               {prod?.productType}
        //             </span>
        //           </p>
        //           <p className="small text-muted mb-2">
        //             ID: <span className="text-dark">{prod?.productId}</span>
        //           </p>

        //           <div className="w-100 border-top pt-2">
        //             <p className="mb-0">
        //               <strong>Rate:</strong>{" "}
        //               <span className="text-success fw-medium">
        //                 {prod?.rate !== null ? `₹${prod.rate}` : "N/A"}
        //               </span>
        //             </p>
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   ))}
        // </div>/
        <div className="row g-4">
          {productList.map((prod, index) => (
            <div
              className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3"
              key={index}
            >
              <div className="card manage-cards h-100 shadow-sm border-2 rounded-4 text-center p-3">
                <img
                  src={prod?.image?.imageUrl || Image_default}
                  alt={prod?.productName || "Product"}
                  className="img-fluid rounded-4 mb-3"
                  style={{
                    height: "150px",
                    objectFit: "contain",
                    width: "100%",
                  }}
                />

                <hr />

                <h6 className="fw-bold mb-2">{prod?.productName}</h6>

                <h6 className="text-success fw-semibold mb-2">
                  ₹{prod?.rate !== null ? prod.rate : "N/A"}
                </h6>

                <div className="d-flex justify-content-center gap-2 mb-3">
                  <span className="badge bg-warning text-dark">
                    {prod?.productType}
                  </span>
                </div>

                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-outline-primary btn-sm rounded-pill"
                    onClick={() => handleEdit(prod)}
                    title="Edit"
                  >
                    <i className="bi bi-pencil-fill"></i>
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm rounded-pill"
                    onClick={() => handleDelete(prod)}
                    title="Delete"
                  >
                    <i className="bi bi-trash-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      <AddProductModal
        show={showProductModal}
        handleClose={() => setShowProductModal(false)}
      />

      {/* Edit Modal */}
      <UniversalEditModal
        show={showEditModal}
        handleClose={() => setShowEditModal(false)}
        handleSave={handleSaveEdit}
        formData={editData || {}}
        setFormData={setEditData}
        title="Edit Product"
        fields={[
          { label: "Product Name", name: "productName" },
          {
            label: "Product ID",
            name: "productId",
            type: "text",
            disabled: true,
          },
          { label: "Rate", name: "rate", type: "number" },
          {
            label: "Product Type",
            name: "productType",
            type: "select",
            options: productTypes,
          },
        ]}
        includeImage={true}
        onImageChange={handleImageChange}
      />

      {/* Manage Types Modal */}
      <ManageTagsModal
        show={showTagsModal}
        onHide={() => setShowTagsModal(false)}
        title={modalTitle}
        initialTags={modalData}
        onSave={handleSaveTags}
      />
    </div>
  );
};

export default ManageProduct;
