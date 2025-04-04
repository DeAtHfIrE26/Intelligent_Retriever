import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Lock, 
  Database, 
  Server, 
  Search,
  AlertTriangle,
  Save,
  Trash,
  RefreshCw
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

// Define schemas for different settings forms
const apiSettingsSchema = z.object({
  openaiApiKey: z.string().min(1, "API key is required"),
  enableAiFeatures: z.boolean().default(true),
  searchModel: z.string().default("gpt-4o"),
  maxSearchResults: z.coerce.number().int().min(1).max(100),
  queryTimeout: z.coerce.number().int().min(1000).max(60000),
});

const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string(),
  bio: z.string().optional(),
});

const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  documentAlerts: z.boolean().default(true),
  securityAlerts: z.boolean().default(true),
  dailyDigest: z.boolean().default(false),
  searchAlerts: z.boolean().default(false),
});

const securitySettingsSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ApiSettingsFormValues = z.infer<typeof apiSettingsSchema>;
type UserProfileFormValues = z.infer<typeof userProfileSchema>;
type NotificationSettingsFormValues = z.infer<typeof notificationSettingsSchema>;
type SecuritySettingsFormValues = z.infer<typeof securitySettingsSchema>;

// Default values for forms
const defaultApiSettings: ApiSettingsFormValues = {
  openaiApiKey: "",
  enableAiFeatures: true,
  searchModel: "gpt-4o",
  maxSearchResults: 20,
  queryTimeout: 10000,
};

const defaultUserProfile: UserProfileFormValues = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "admin",
  bio: "System administrator",
};

const defaultNotificationSettings: NotificationSettingsFormValues = {
  emailNotifications: true,
  documentAlerts: true,
  securityAlerts: true,
  dailyDigest: false,
  searchAlerts: false,
};

const defaultSecuritySettings: SecuritySettingsFormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function Settings() {
  const [activeTab, setActiveTab] = useState("api");
  const [systemStatus, setSystemStatus] = useState<'operational' | 'degraded' | 'maintenance'>('operational');
  const [aiStatus, setAiStatus] = useState<'connected' | 'disconnected' | 'error'>('connected');
  const { toast } = useToast();

  // API Settings form
  const apiSettingsForm = useForm<ApiSettingsFormValues>({
    resolver: zodResolver(apiSettingsSchema),
    defaultValues: defaultApiSettings
  });

  // User Profile form
  const userProfileForm = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: defaultUserProfile
  });

  // Notification Settings form
  const notificationSettingsForm = useForm<NotificationSettingsFormValues>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: defaultNotificationSettings
  });

  // Security Settings form
  const securitySettingsForm = useForm<SecuritySettingsFormValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: defaultSecuritySettings
  });

  // Check API key status
  const checkApiKeyStatus = async () => {
    try {
      const response = await apiRequest("GET", "/api/ai/status");
      const data = await response.json();
      
      if (data.status === "connected") {
        setAiStatus('connected');
        toast({
          title: "API Connection Successful",
          description: "The OpenAI API key is valid and connected.",
        });
      } else {
        setAiStatus('error');
        toast({
          title: "API Connection Error",
          description: data.message || "Unable to connect to OpenAI API.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setAiStatus('disconnected');
      toast({
        title: "API Connection Check Failed",
        description: "Could not verify the API connection status.",
        variant: "destructive",
      });
    }
  };

  // Save API settings
  const onSubmitApiSettings = async (data: ApiSettingsFormValues) => {
    try {
      // Here we would normally send the data to the backend
      // const response = await apiRequest("POST", "/api/settings/api", data);
      
      // For now, we'll just simulate a successful update
      toast({
        title: "API Settings Updated",
        description: "Your API settings have been saved successfully.",
      });
      
      // Check API key status after update
      checkApiKeyStatus();
    } catch (error) {
      toast({
        title: "Failed to Update API Settings",
        description: "An error occurred while saving your API settings.",
        variant: "destructive",
      });
    }
  };

  // Save user profile
  const onSubmitUserProfile = async (data: UserProfileFormValues) => {
    try {
      // Here we would normally send the data to the backend
      // const response = await apiRequest("POST", "/api/user/profile", data);
      
      // For now, we'll just simulate a successful update
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to Update Profile",
        description: "An error occurred while saving your profile.",
        variant: "destructive",
      });
    }
  };

  // Save notification settings
  const onSubmitNotificationSettings = async (data: NotificationSettingsFormValues) => {
    try {
      // Here we would normally send the data to the backend
      // const response = await apiRequest("POST", "/api/settings/notifications", data);
      
      // For now, we'll just simulate a successful update
      toast({
        title: "Notification Settings Updated",
        description: "Your notification preferences have been saved.",
      });
    } catch (error) {
      toast({
        title: "Failed to Update Notification Settings",
        description: "An error occurred while saving your notification preferences.",
        variant: "destructive",
      });
    }
  };

  // Save security settings
  const onSubmitSecuritySettings = async (data: SecuritySettingsFormValues) => {
    try {
      // Here we would normally send the data to the backend
      // const response = await apiRequest("POST", "/api/user/password", data);
      
      // For now, we'll just simulate a successful update
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
      });
      
      // Reset form after successful submission
      securitySettingsForm.reset(defaultSecuritySettings);
    } catch (error) {
      toast({
        title: "Failed to Change Password",
        description: "An error occurred while updating your password.",
        variant: "destructive",
      });
    }
  };

  // Simulate rebuilding the search index
  const rebuildSearchIndex = () => {
    toast({
      title: "Rebuilding Search Index",
      description: "This process may take a few minutes.",
    });
    
    // Simulate completion after 3 seconds
    setTimeout(() => {
      toast({
        title: "Search Index Rebuilt",
        description: "The search index has been successfully rebuilt.",
      });
    }, 3000);
  };

  // Simulate database backup
  const backupDatabase = () => {
    toast({
      title: "Database Backup Started",
      description: "Creating a backup of the document database.",
    });
    
    // Simulate completion after 2 seconds
    setTimeout(() => {
      toast({
        title: "Database Backup Complete",
        description: "The backup has been created successfully.",
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600">Manage your account and system preferences</p>
        </div>
        
        <div className="flex flex-col space-y-6">
          {/* Status overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current status of system components</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-4">
                  <div className={`h-3 w-3 rounded-full ${
                    systemStatus === 'operational' ? 'bg-green-500' :
                    systemStatus === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">System Status</p>
                    <p className="text-xs text-slate-500 capitalize">{systemStatus}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className={`h-3 w-3 rounded-full ${
                    aiStatus === 'connected' ? 'bg-green-500' :
                    aiStatus === 'disconnected' ? 'bg-yellow-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">AI Services</p>
                    <p className="text-xs text-slate-500 capitalize">{aiStatus}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <div>
                    <p className="text-sm font-medium">Database</p>
                    <p className="text-xs text-slate-500">Connected</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Main settings tabs */}
          <Tabs
            defaultValue="api"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="api" className="flex items-center">
                <Server className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">API Settings</span>
                <span className="md:hidden">API</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">User Profile</span>
                <span className="md:hidden">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Notifications</span>
                <span className="md:hidden">Alerts</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Lock className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Security</span>
                <span className="md:hidden">Security</span>
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center">
                <Database className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">System Maintenance</span>
                <span className="md:hidden">System</span>
              </TabsTrigger>
            </TabsList>
            
            {/* API Settings */}
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API Configuration</CardTitle>
                  <CardDescription>
                    Manage your AI service connections and search settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...apiSettingsForm}>
                    <form onSubmit={apiSettingsForm.handleSubmit(onSubmitApiSettings)} className="space-y-6">
                      <FormField
                        control={apiSettingsForm.control}
                        name="openaiApiKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>OpenAI API Key</FormLabel>
                            <div className="flex space-x-2">
                              <FormControl>
                                <Input
                                  type="password"
                                  placeholder="sk-..."
                                  autoComplete="off"
                                  {...field}
                                />
                              </FormControl>
                              <Button
                                type="button"
                                variant="outline"
                                className="flex-shrink-0"
                                onClick={checkApiKeyStatus}
                              >
                                Verify
                              </Button>
                            </div>
                            <FormDescription>
                              Your OpenAI API key for AI-powered search functionality
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={apiSettingsForm.control}
                          name="searchModel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Search Model</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select model" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="gpt-4o">GPT-4o (Recommended)</SelectItem>
                                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                AI model used for semantic search and document analysis
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={apiSettingsForm.control}
                          name="maxSearchResults"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Max Search Results</FormLabel>
                              <FormControl>
                                <Input type="number" min={1} max={100} {...field} />
                              </FormControl>
                              <FormDescription>
                                Maximum number of results returned by search queries
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={apiSettingsForm.control}
                          name="queryTimeout"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Query Timeout (ms)</FormLabel>
                              <FormControl>
                                <Input type="number" min={1000} max={60000} step={1000} {...field} />
                              </FormControl>
                              <FormDescription>
                                Maximum time allowed for search query execution
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={apiSettingsForm.control}
                          name="enableAiFeatures"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Enable AI Features
                                </FormLabel>
                                <FormDescription>
                                  Enable semantic search and document analysis
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
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="w-full md:w-auto">
                          <Save className="h-4 w-4 mr-2" />
                          Save API Settings
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* User Profile */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>User Profile</CardTitle>
                  <CardDescription>
                    Manage your personal information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...userProfileForm}>
                    <form onSubmit={userProfileForm.handleSubmit(onSubmitUserProfile)} className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-2xl font-bold">
                          JD
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            Change Avatar
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={userProfileForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={userProfileForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={userProfileForm.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Role</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                  </SelectTrigger>
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
                          control={userProfileForm.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell us about yourself"
                                  className="resize-none"
                                  {...field}
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="w-full md:w-auto">
                          <Save className="h-4 w-4 mr-2" />
                          Save Profile
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Notification Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Control how and when you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...notificationSettingsForm}>
                    <form onSubmit={notificationSettingsForm.handleSubmit(onSubmitNotificationSettings)} className="space-y-6">
                      <FormField
                        control={notificationSettingsForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Email Notifications
                              </FormLabel>
                              <FormDescription>
                                Receive notifications via email
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
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <h3 className="text-sm font-medium">Notification Types</h3>
                        
                        <FormField
                          control={notificationSettingsForm.control}
                          name="documentAlerts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between space-x-2">
                              <div className="space-y-0.5">
                                <FormLabel>
                                  Document Alerts
                                </FormLabel>
                                <FormDescription className="text-xs">
                                  Notifications about new or updated documents
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
                        
                        <FormField
                          control={notificationSettingsForm.control}
                          name="securityAlerts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between space-x-2">
                              <div className="space-y-0.5">
                                <FormLabel>
                                  Security Alerts
                                </FormLabel>
                                <FormDescription className="text-xs">
                                  Important security-related notifications
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
                        
                        <FormField
                          control={notificationSettingsForm.control}
                          name="dailyDigest"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between space-x-2">
                              <div className="space-y-0.5">
                                <FormLabel>
                                  Daily Digest
                                </FormLabel>
                                <FormDescription className="text-xs">
                                  Receive a daily summary of activity
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
                        
                        <FormField
                          control={notificationSettingsForm.control}
                          name="searchAlerts"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between space-x-2">
                              <div className="space-y-0.5">
                                <FormLabel>
                                  Search Alerts
                                </FormLabel>
                                <FormDescription className="text-xs">
                                  Get notified about saved search results
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
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="w-full md:w-auto">
                          <Save className="h-4 w-4 mr-2" />
                          Save Notification Settings
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Security Settings */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your account security and password
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...securitySettingsForm}>
                    <form onSubmit={securitySettingsForm.handleSubmit(onSubmitSecuritySettings)} className="space-y-6">
                      <FormField
                        control={securitySettingsForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                              <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={securitySettingsForm.control}
                          name="newPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>New Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormDescription>
                                Password must be at least 8 characters
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={securitySettingsForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm New Password</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                        <div className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
                          <div>
                            <h3 className="text-sm font-medium text-amber-800">Important Security Note</h3>
                            <p className="text-sm text-amber-700 mt-1">
                              Make sure your password is strong and unique. We recommend using a password manager
                              to generate and store secure passwords.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" className="w-full md:w-auto">
                          <Save className="h-4 w-4 mr-2" />
                          Update Password
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* System Maintenance */}
            <TabsContent value="system">
              <Card>
                <CardHeader>
                  <CardTitle>System Maintenance</CardTitle>
                  <CardDescription>
                    Manage system-level tasks and maintenance
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Index Management</h3>
                    
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Search Index</h4>
                          <p className="text-sm text-slate-500">
                            Rebuild the search index to ensure all documents are properly indexed
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Button onClick={rebuildSearchIndex}>
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Rebuild Index
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Database Backup</h4>
                          <p className="text-sm text-slate-500">
                            Create a backup of the document database
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Button onClick={backupDatabase} variant="outline">
                            <Database className="h-4 w-4 mr-2" />
                            Backup Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">System Information</h3>
                    
                    <div className="rounded-lg border p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium">Version</h4>
                          <p className="text-sm text-slate-500">v1.2.0</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Last Update</h4>
                          <p className="text-sm text-slate-500">March 23, 2025</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Document Count</h4>
                          <p className="text-sm text-slate-500">5</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Storage Usage</h4>
                          <p className="text-sm text-slate-500">12.4 MB / 5 GB</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium text-red-600">Danger Zone</h3>
                    
                    <div className="rounded-lg border border-red-200 p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="space-y-1">
                          <h4 className="text-sm font-medium">Reset System</h4>
                          <p className="text-sm text-slate-500">
                            This will delete all documents and reset the system to its default state
                          </p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <Button variant="destructive">
                            <Trash className="h-4 w-4 mr-2" />
                            Reset System
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}