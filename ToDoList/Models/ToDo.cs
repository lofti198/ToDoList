using Microsoft.AspNetCore.Identity;

namespace ToDoList.Models
{
    public class ToDo
    {
        public int ToDoId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? DueDate { get; set; }
        public bool IsCompleted { get; set; }
        public int? Priority { get; set; }

        // Navigation property for the related IdentityUser
        public string UserId { get; set; }
        public virtual IdentityUser User { get; set; }
    }

}
