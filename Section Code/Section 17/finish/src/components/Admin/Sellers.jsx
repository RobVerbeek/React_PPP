import React, { useState } from "react";
import Loader from "../Common/Loader";
import useSellers from "../../hooks/sellers/useSellers";
import { useQueryClient } from "@tanstack/react-query";
import useAddSeller from "../../hooks/sellers/useAddSeller";
import useDeleteSeller from "../../hooks/sellers/useDeleteSeller";
import useUpdateSeller from "../../hooks/sellers/useUpdateSeller";

const Sellers = () => {
  const [name, setName] = useState("");

  const { data: sellers, error, isLoading } = useSellers();
  const queryClient = useQueryClient();

  const addSellerMutation = useAddSeller();
  const deleteSellerMutation = useDeleteSeller();
  const updateSellerMutation = useUpdateSeller();

  const addSeller = () => {
    const newSeller = {
      name,
      id: sellers.length + 1,
    };

    addSellerMutation.mutate(newSeller);
  };

  const deleteSeller = (id) => {
    deleteSellerMutation.mutate(id, {
      onSuccess: () => {
        queryClient.setQueryData(["sellers"], (sellers) =>
          sellers.filter((s) => s.id !== id)
        );
      },
    });
  };

  const updateSeller = (seller) => {
    const updatedSeller = {
      ...seller,
      name: seller.name + " Updated",
    };
    updateSellerMutation.mutate(updatedSeller);
  };

  return (
    <>
      <h3>Admin Sellers Page</h3>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <button disabled={addSellerMutation.isPending} onClick={addSeller}>
        {addSellerMutation.isPending ? "Adding Seller" : "Add Seller"}
      </button>
      {isLoading && <Loader />}
      {error && <em>{error.message}</em>}
      {addSellerMutation.error && <em>{addSellerMutation.error.message}</em>}

      <table>
        <tbody>
          {sellers?.map((seller) => (
            <tr key={seller.id}>
              <td>{seller.name}</td>
              <td>
                <button onClick={() => updateSeller(seller)}>Update</button>
              </td>
              <td>
                <button onClick={() => deleteSeller(seller.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Sellers;
