<div className='flex flex-col'>
          {UserScriptData.map((user, index)=>(
            <div onClick={()=>{setSelectedChat(user)}}
            key={index} className={`relative flex items-center gap-2 p-2 pl-4 rounded
            cursor-pointer max-sm:text-sm 
            ${selectedChat?._id === user._id && 'bg-[#282142]/50'}`}>
              <img src={user?.profilePic || assets.avatar_icon} alt="profile_pic" 
              className='w-[35px] aspect-[1/1] rounded-full'/>
              <div className='flex flex-col leading-5'>
                <p>{user.fullName}</p>
                {
                  index < 3
                  ? <span className='text-green-400 text-x5'>Online</span> 
                  : <span className='text-neutral-400 text-x5'>Offline</span>
                }
              </div>
              {index > 2 && <p className='absolute top-4 right-4 text-xs
              h-5 w-5 flex justify-center rounded-full bg-violet-500/50'>
              {index}</p>}
            </div>
          )
          )}

      </div>