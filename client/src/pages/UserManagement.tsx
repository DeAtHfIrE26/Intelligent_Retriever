import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Users,
  Plus,
  MoreHorizontal,
  Search,
  User,
  Mail,
  Shield,
  Edit,
  Trash,
  Key,
  CheckCircle,
  XCircle
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

// Define user schemas
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string(),
  isActive: z.boolean().default(true),
});

type UserFormValues = z.infer<typeof userSchema>;

// Sample user data
const sampleUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    isActive: true,
    avatar: "",
    lastActive: "1 hour ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "manager",
    isActive: true,
    avatar: "",
    lastActive: "3 hours ago",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "user",
    isActive: true,
    avatar: "",
    lastActive: "2 days ago",
  },
  {
    id: 4,
    name: "Emily Williams",
    email: "emily.williams@example.com",
    role: "viewer",
    isActive: false,
    avatar: "",
    lastActive: "1 week ago",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "user",
    isActive: true,
    avatar: "",
    lastActive: "Just now",
  },
];

export default function UserManagement() {
  const [users, setUsers] = useState(sampleUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  // Role label and color mapping
  const roleMap: Record<string, { label: string; color: string }> = {
    admin: { label: "Administrator", color: "bg-red-100 text-red-800" },
    manager: { label: "Manager", color: "bg-purple-100 text-purple-800" },
    user: { label: "User", color: "bg-blue-100 text-blue-800" },
    viewer: { label: "Viewer", color: "bg-green-100 text-green-800" },
  };

  // Form for adding/editing users
  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      isActive: true,
    },
  });

  // Reset form when dialog closes
  const resetForm = () => {
    userForm.reset({
      name: "",
      email: "",
      role: "user",
      isActive: true,
    });
  };

  // Initialize edit form with user data
  const initEditForm = (user: any) => {
    userForm.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    });
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  // Handle add user form submission
  const onAddUser = (data: UserFormValues) => {
    const newUser = {
      id: users.length + 1,
      ...data,
      avatar: "",
      lastActive: "Just now",
    };

    setUsers([...users, newUser]);
    setIsAddUserOpen(false);
    resetForm();

    toast({
      title: "User Added",
      description: `${data.name} has been added successfully.`,
    });
  };

  // Handle edit user form submission
  const onEditUser = (data: UserFormValues) => {
    if (!selectedUser) return;

    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? { ...user, ...data } : user
    );

    setUsers(updatedUsers);
    setIsEditUserOpen(false);
    resetForm();

    toast({
      title: "User Updated",
      description: `${data.name}'s information has been updated.`,
    });
  };

  // Handle delete user
  const onDeleteUser = () => {
    if (!selectedUser) return;

    const updatedUsers = users.filter((user) => user.id !== selectedUser.id);
    setUsers(updatedUsers);
    setIsDeleteUserOpen(false);

    toast({
      title: "User Deleted",
      description: `${selectedUser.name} has been removed.`,
    });
  };

  // Handle reset password
  const onResetPassword = () => {
    if (!selectedUser) return;

    setIsResetPasswordOpen(false);

    toast({
      title: "Password Reset",
      description: `Password reset link has been sent to ${selectedUser.email}.`,
    });
  };

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    // Text search
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Role filter
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    // Status filter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Get avatar initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">User Management</h1>
            <p className="text-slate-600">Manage users and their permissions</p>
          </div>

          <Button onClick={() => setIsAddUserOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <Input
                className="pl-10"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Select
                value={roleFilter}
                onValueChange={setRoleFilter}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Administrators</SelectItem>
                  <SelectItem value="manager">Managers</SelectItem>
                  <SelectItem value="user">Users</SelectItem>
                  <SelectItem value="viewer">Viewers</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Users table */}
        <Card>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Users className="h-8 w-8 text-slate-400 mb-2" />
                        <p className="text-slate-500 mb-2">No users found</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSearchQuery("");
                            setRoleFilter("all");
                            setStatusFilter("all");
                          }}
                        >
                          Reset filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-slate-500">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={roleMap[user.role]?.color || "bg-slate-100"}>
                          {roleMap[user.role]?.label || user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.isActive ? (
                          <div className="flex items-center text-green-700">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            <span>Active</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-slate-500">
                            <XCircle className="h-4 w-4 mr-1" />
                            <span>Inactive</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => initEditForm(user)}
                              className="cursor-pointer"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user);
                                setIsResetPasswordOpen(true);
                              }}
                              className="cursor-pointer"
                            >
                              <Key className="h-4 w-4 mr-2" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedUser(user);
                                setIsDeleteUserOpen(true);
                              }}
                              className="text-red-600 cursor-pointer"
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account with appropriate permissions
            </DialogDescription>
          </DialogHeader>
          <Form {...userForm}>
            <form onSubmit={userForm.handleSubmit(onAddUser)} className="space-y-4">
              <FormField
                control={userForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
                        <Input className="pl-9" placeholder="John Doe" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={userForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
                        <Input className="pl-9" placeholder="example@domain.com" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={userForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <Shield className="absolute top-2.5 left-3 h-4 w-4 text-slate-500 pointer-events-none" />
                          <SelectTrigger className="pl-9">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This determines what permissions the user will have
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={userForm.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Active Status</FormLabel>
                      <FormDescription>
                        Enable this account for immediate access
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add User</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Modify user information and permissions
            </DialogDescription>
          </DialogHeader>
          <Form {...userForm}>
            <form onSubmit={userForm.handleSubmit(onEditUser)} className="space-y-4">
              <FormField
                control={userForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
                        <Input className="pl-9" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={userForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute top-2.5 left-3 h-4 w-4 text-slate-500" />
                        <Input className="pl-9" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={userForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <div className="relative">
                          <Shield className="absolute top-2.5 left-3 h-4 w-4 text-slate-500 pointer-events-none" />
                          <SelectTrigger className="pl-9">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </div>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={userForm.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between space-x-2 rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Active Status</FormLabel>
                      <FormDescription>
                        {field.value ? "User has access to the system" : "User is currently disabled"}
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <DialogFooter className="pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditUserOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation */}
      <AlertDialog open={isDeleteUserOpen} onOpenChange={setIsDeleteUserOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDeleteUser} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset Password Confirmation */}
      <AlertDialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Password</AlertDialogTitle>
            <AlertDialogDescription>
              This will send a password reset link to {selectedUser?.email}. Would you like to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onResetPassword}>Send Reset Link</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}