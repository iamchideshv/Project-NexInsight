import React, { useState } from 'react';
import { lostAndFoundData } from '../lostAndFoundData';
import { LostAndFoundItem, LostAndFoundStatus } from '../../types';
import ClaimVerificationModal from './ClaimVerificationModal';
import ReportItemModal from './ReportItemModal';

type StatusFilter = 'All' | 'Unclaimed' | 'Claimed';

const StatusBadge: React.FC<{ status: LostAndFoundStatus }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
  if (status === 'Claimed') {
    return <span className={`${baseClasses} bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300`}>Claimed</span>;
  }
  return <span className={`${baseClasses} bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300`}>Unclaimed</span>;
};

const LostAndFound: React.FC = () => {
  const [items, setItems] = useState<LostAndFoundItem[]>(lostAndFoundData);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [claimingItem, setClaimingItem] = useState<LostAndFoundItem | null>(null);

  const handleStatusChangeClick = (item: LostAndFoundItem) => {
    if (item.status === 'Unclaimed') {
      setClaimingItem(item);
      setIsClaimModalOpen(true);
    } else {
      // Instantly mark as unclaimed
      // Fix: Add type assertion to ensure the status type matches LostAndFoundStatus
      const updatedItems = items.map(i =>
        i.id === item.id ? { ...i, status: 'Unclaimed' as LostAndFoundStatus, claimedByEmail: undefined, claimedByPhone: undefined } : i
      );
      setItems(updatedItems);

      const itemInSource = lostAndFoundData.find(i => i.id === item.id);
      if (itemInSource) {
        itemInSource.status = 'Unclaimed';
        delete itemInSource.claimedByEmail;
        delete itemInSource.claimedByPhone;
      }
    }
  };

  const handleConfirmClaim = ({ email, phone }: { email: string, phone: string }) => {
    if (!claimingItem) return;

    const updatedItems = items.map(item =>
      item.id === claimingItem.id ? { ...item, status: 'Claimed' as const, claimedByEmail: email, claimedByPhone: phone } : item
    );
    setItems(updatedItems);

    const itemInSource = lostAndFoundData.find(item => item.id === claimingItem.id);
    if (itemInSource) {
      itemInSource.status = 'Claimed';
      itemInSource.claimedByEmail = email;
      itemInSource.claimedByPhone = phone;
    }

    alert(`Item '${claimingItem.name}' claimed by ${email}. Verification details recorded.`);
    setIsClaimModalOpen(false);
    setClaimingItem(null);
  };

  const handleReportSubmit = (newItemData: Omit<LostAndFoundItem, 'id' | 'status' | 'image' | 'claimedByEmail' | 'claimedByPhone'> & { image: string | null }) => {
    const newItem: LostAndFoundItem = {
      name: newItemData.name,
      type: newItemData.type,
      description: newItemData.description,
      location: newItemData.location,
      date: newItemData.date,
      id: Math.max(0, ...items.map(i => i.id)) + 1,
      status: 'Unclaimed',
      image: newItemData.image || `https://placehold.co/600x400/cccccc/FFFFFF/png?text=${encodeURIComponent(newItemData.name)}`
    };

    // Update state and mock data source
    setItems(prevItems => [newItem, ...prevItems]);
    lostAndFoundData.unshift(newItem);

    alert(`Item "${newItem.name}" reported successfully.`);
    setIsReportModalOpen(false);
  };


  const filteredItems = items.filter(item => {
    const statusMatch = statusFilter === 'All' || item.status === statusFilter;
    return statusMatch;
  });

  const StatusButton: React.FC<{label: StatusFilter}> = ({label}) => (
    <button onClick={() => setStatusFilter(label)} className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${statusFilter === label ? 'bg-gray-600 dark:bg-gray-200 text-white dark:text-gray-800' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>
        {label}
    </button>
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Lost & Found</h2>
        <button 
          onClick={() => setIsReportModalOpen(true)} // Open report modal
          className="mt-4 md:mt-0 px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition">
          Report an Item
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row md:justify-end items-end md:items-baseline mb-6 border-b dark:border-gray-700 pb-4">
         <div className="flex space-x-2 mt-4 md:mt-0">
          <StatusButton label="All" />
          <StatusButton label="Unclaimed" />
          <StatusButton label="Claimed" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item: LostAndFoundItem) => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{item.name}</h3>
                <StatusBadge status={item.status} />
              </div>
              <p className={`text-sm font-semibold mt-1 ${item.type === 'Lost' ? 'text-red-500' : 'text-green-500'}`}>{item.type} Item</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex-grow">{item.description}</p>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 pt-3 border-t dark:border-gray-700 space-y-1">
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Date:</strong> {item.date}</p>
                {item.status === 'Claimed' && item.claimedByEmail && (
                    <p className="text-green-600 dark:text-green-400"><strong>Claimed by:</strong> {item.claimedByEmail}</p>
                )}
              </div>
               <div className="mt-4 pt-4 border-t dark:border-gray-700">
                  <button
                      onClick={() => handleStatusChangeClick(item)}
                      className={`w-full px-4 py-2 text-sm font-semibold rounded-lg transition ${
                          item.status === 'Unclaimed' 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                      }`}
                  >
                      {item.status === 'Unclaimed' ? 'Mark as Claimed' : 'Mark as Unclaimed'}
                  </button>
              </div>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <p className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">No items match the current filters.</p>
        )}
      </div>

      {isClaimModalOpen && claimingItem && (
        <ClaimVerificationModal
          isOpen={isClaimModalOpen}
          onClose={() => setIsClaimModalOpen(false)}
          onConfirm={handleConfirmClaim}
          item={claimingItem}
        />
      )}

      {/* New Report Item Modal */}
      <ReportItemModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onConfirm={handleReportSubmit}
      />
    </div>
  );
};

export default LostAndFound;